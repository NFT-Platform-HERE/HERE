package com.ssafy.hereauth.service;

import com.ssafy.hereauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereauth.dto.notification.*;
import com.ssafy.hereauth.entity.Member;
import com.ssafy.hereauth.entity.Notification;
import com.ssafy.hereauth.enumeration.EnumNotificationStatus;
import com.ssafy.hereauth.enumeration.response.HereStatus;
import com.ssafy.hereauth.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.hereauth.repository.MemberRepository;
import com.ssafy.hereauth.repository.NotificationRepository;
import com.ssafy.hereauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService {

    private final ResponseUtil responseUtil;
    private final NotificationRepository notificationRepository;
    private final MemberRepository memberRepository;

    public ResponseSuccessDto<SaveNotificationResponseDto> save(SaveNotificationRequestDto saveNotificationRequestDto) {
        Member sender = memberRepository.findById(saveNotificationRequestDto.getSenderId())
                .orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));
        Member receiver = memberRepository.findById(saveNotificationRequestDto.getReceiverId())
                .orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));

        Notification notification = new Notification().createNotification(sender, receiver, saveNotificationRequestDto.getContent());
        notificationRepository.save(notification);

        SaveNotificationResponseDto saveNotificationResponseDto = new SaveNotificationResponseDto("알림 저장 성공");
        ResponseSuccessDto<SaveNotificationResponseDto> res = responseUtil.successResponse(saveNotificationResponseDto, HereStatus.HERE_CREATE_NOTIFICATION);
        return res;
    }

    public ResponseSuccessDto<List<CheckNotificationResponseDto>> read(UUID memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));
        List<Notification> notificationList = notificationRepository.findAllByReceiverAndStatus(member, EnumNotificationStatus.INACTIVE);

        List<CheckNotificationResponseDto> checkNotificationResponseDtoList = new ArrayList<>();
        for (Notification notification : notificationList) {
            CheckNotificationResponseDto checkNotificationResponseDto = CheckNotificationResponseDto.builder()
                    .senderId(notification.getSender().getId())
                    .senderNickname(notification.getSender().getNickname())
                    .content(notification.getContent())
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
                .message("알림 읽은 처리 완료")
                .build();

        ResponseSuccessDto<UpdateNotificationResponseDto> res = responseUtil.successResponse(updateNotificationResponseDto, HereStatus.HERE_READ_NOTIFICATION);
        return res;
    }
}
