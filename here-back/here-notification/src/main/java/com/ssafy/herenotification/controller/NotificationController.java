package com.ssafy.herenotification.controller;

import com.ssafy.herenotification.dto.common.response.ResponseSuccessDto;
import com.ssafy.herenotification.dto.notification.*;
import com.ssafy.herenotification.entity.Member;
import com.ssafy.herenotification.repository.MemberRepository;
import com.ssafy.herenotification.service.NotificationService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
@Log4j2
public class NotificationController {

    private final NotificationService notificationService;
    private final MemberRepository memberRepository;
    @GetMapping(value = "/subscribe/{uu}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@PathVariable String uu, @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId){
        UUID uuid = UUID.fromString(uu);
        return notificationService.subscribe(uuid, lastEventId);
    }

    @GetMapping(value = "/send/{uu}")
    public String send(@PathVariable String uu){
        UUID uuid = UUID.fromString(uu);
        Member member1  = memberRepository.findById(uuid)
                .orElseThrow(() -> new RuntimeException());
        System.out.println("멤버1:" + member1.getNickname());
        Member member2  = memberRepository.findById(uuid)
                .orElseThrow(() -> new RuntimeException());
        String content = "테스트";

        notificationService.send(member1, member1,content);
        return content;
    }

    /* 알림 등록 */
    @ApiOperation(value = "알림 등록", notes = "알림을 등록합니다.")
    @PostMapping()
    public ResponseEntity<ResponseSuccessDto<SaveNotificationResponseDto>> saveNotification(@RequestBody SaveNotificationRequestDto saveNotificationRequestDto) {
        return ResponseEntity.ok(notificationService.save(saveNotificationRequestDto));
    }

    /* 내 알림 확인 */
    @ApiOperation(value = "내 알림 확인", notes = "나의 알림 내역을 조회합니다.")
    @GetMapping("/{memberId}")
    public ResponseEntity<ResponseSuccessDto<List<CheckNotificationResponseDto>>> checkNotification(@PathVariable("memberId")UUID memberId) {
        return ResponseEntity.ok(notificationService.read(memberId));
    }

    /* 알림 읽음 처리 */
    @ApiOperation(value = "알림 읽음 처리", notes = "알림 읽음 처리를 합니다.")
    @PatchMapping()
    public ResponseEntity<ResponseSuccessDto<UpdateNotificationResponseDto>> updateNotification(@RequestBody UpdateNotificationRequestDto updateNotificationRequestDto) {
        return ResponseEntity.ok(notificationService.update(updateNotificationRequestDto));
    }

}
