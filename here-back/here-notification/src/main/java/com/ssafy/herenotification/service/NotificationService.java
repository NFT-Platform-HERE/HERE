package com.ssafy.herenotification.service;

import com.ssafy.herenotification.dto.common.response.ResponseSuccessDto;
import com.ssafy.herenotification.dto.notification.*;
import com.ssafy.herenotification.entity.Member;
import com.ssafy.herenotification.entity.NftHistory;
import com.ssafy.herenotification.entity.Notification;
import com.ssafy.herenotification.enumeration.EnumNotificationStatus;
import com.ssafy.herenotification.enumeration.response.HereStatus;
import com.ssafy.herenotification.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.herenotification.repository.*;
import com.ssafy.herenotification.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService {
    private final EmitterRepository emitterRepository = new EmitterRepositoryImpl();
    private final NotificationRepository notificationRepository;
    private final NftHistoryRepository nftHistoryRepository;
    private final ResponseUtil responseUtil;
    private final MemberRepository memberRepository;

    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    public SseEmitter subscribe(UUID memberId, String lastEventId) {
        String emitterId = memberId + "_" + System.currentTimeMillis();
        SseEmitter emitter = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));

        //emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        emitter.onCompletion(() -> {
            log.info("onCompletion callback");
            emitterRepository.deleteById(emitterId);   // 만료되면 리스트에서 삭제
        });
        //emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));
        emitter.onTimeout(() -> {
            log.info("onTimeout callback");
            emitterRepository.deleteById(emitterId);
            emitter.complete();
        });

        Map<String, SseEmitter> sseEmitters = emitterRepository.findAllEmitterStartWithByMemberId(String.valueOf(memberId));

        // 503 에러 방지
        sendToClient(emitter, emitterId, "EventStream Created. [memberId=" + memberId + "]");

        // 미수신한 event 목록 존재할 경우 전송하여 유실 예방
        if (!lastEventId.isEmpty()) {
            Map<String, Object> events = emitterRepository.findAllEventCacheStartWithByMemberId(String.valueOf(memberId));
            events.entrySet().stream()
                    .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                    .forEach(entry -> sendToClient(emitter, entry.getKey(), entry.getValue()));
        }

        return emitter;
    }

    private void sendToClient(SseEmitter emitter, String emitterId, Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(emitterId)
                    .data(data, MediaType.APPLICATION_JSON)
                    .reconnectTime(500));
        } catch (IOException exception) {
            emitterRepository.deleteById(emitterId);
        }
    }

    public ResponseSuccessDto<SaveNotificationResponseDto> save(SaveNotificationRequestDto saveNotificationRequestDto) {
        Member sender = memberRepository.findById(saveNotificationRequestDto.getSenderId())
                .orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));
        Member receiver = memberRepository.findById(saveNotificationRequestDto.getReceiverId())
                .orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));

        Notification notification = new Notification().createNotification(sender, receiver, saveNotificationRequestDto);
        notificationRepository.save(notification);
        String code = String.valueOf(saveNotificationRequestDto.getCode());
        String con;
        switch (code) {
            case "DONATED":
                con = "따뜻한 마음이 손길을 전해왔어요.";
                break;
            case "CLOSED":
                con = "당신의 정이 담긴 나눔글이 마감되었어요.";
                break;
            case "HOSPITAL":
                con = "따뜻한 마음이 병원에 전달되어 위로가 전해졌어요.";
                break;
            default:
                con = "메시지가 도착했습니다.";
                break;
        }
        // 로그인 한 유저의 SseEmitter 모두 가져오기
        String memberId = String.valueOf(receiver.getId());
        Map<String, SseEmitter> sseEmitters = emitterRepository.findAllEmitterStartWithByMemberId(String.valueOf(memberId));

        sseEmitters.forEach(
                (key, emitter) -> {
                    // 데이터 캐시 저장(유실 데이터 처리)
                    emitterRepository.saveEventCache(key, notification);

                    // 데이터 전송
                    sendToClient(emitter, key, con);
                }
        );

        SaveNotificationResponseDto saveNotificationResponseDto = new SaveNotificationResponseDto("알림 저장 성공");
        ResponseSuccessDto<SaveNotificationResponseDto> res = responseUtil.successResponse(saveNotificationResponseDto, HereStatus.HERE_CREATE_NOTIFICATION);
        return res;
    }

    public ResponseSuccessDto<List<CheckNotificationResponseDto>> read(UUID memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));
//        List<Notification> notificationList = notificationRepository.findAllByReceiverAndStatusOrderByCreatedDateDesc(member, EnumNotificationStatus.INACTIVE);
        List<Notification> notificationList = notificationRepository.findAllByReceiverOrderByCreatedDateDesc(member);

        List<CheckNotificationResponseDto> checkNotificationResponseDtoList = new ArrayList<>();
        for (Notification notification : notificationList) {
            Long nftId = notification.getNftId();
            List<NftHistory> nftHistoryList = nftId != 0L ? nftHistoryRepository.findAllByNftId(nftId): new ArrayList<>();
            List<UUID> memberIdList = new ArrayList<>();
            for (NftHistory nftHistory : nftHistoryList) {
                memberIdList.add(nftHistory.getMemberId());
            }

            CheckNotificationResponseDto checkNotificationResponseDto = CheckNotificationResponseDto.builder()
                    .notificationId(notification.getId())
                    .senderId(notification.getSender().getId())
                    .senderNickname(notification.getSender().getNickname())
                    .memberIdList(memberIdList)
                    .status(notification.getStatus())
                    .content(notification.getContent())
                    .code(notification.getCode())
                    .build();
            checkNotificationResponseDtoList.add(checkNotificationResponseDto);
        }

        ResponseSuccessDto<List<CheckNotificationResponseDto>> res = responseUtil.successResponse(checkNotificationResponseDtoList, HereStatus.HERE_FIND_NOTIFICATION);
        return res;
    }

    public ResponseSuccessDto<UpdateNotificationResponseDto> update(UpdateNotificationRequestDto updateNotificationRequestDto) {
        Member member = memberRepository.findById(updateNotificationRequestDto.getMemberId()).orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));
        Notification notification = notificationRepository.findByIdAndReceiver(
                updateNotificationRequestDto.getNotificationId(), member).orElseThrow(() -> new EntityIsNullException("해당 알림이 존재하지 않습니다"));

        notification.updateNotificationStatus();

        UpdateNotificationResponseDto updateNotificationResponseDto = UpdateNotificationResponseDto.builder()
                .message("알림 읽음 처리 완료")
                .build();

        ResponseSuccessDto<UpdateNotificationResponseDto> res = responseUtil.successResponse(updateNotificationResponseDto, HereStatus.HERE_READ_NOTIFICATION);
        return res;
    }
}