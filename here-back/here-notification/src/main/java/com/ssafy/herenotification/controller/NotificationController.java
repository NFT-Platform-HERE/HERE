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
@RequestMapping("/notification")
@Log4j2
public class NotificationController {

    private final NotificationService notificationService;

    /* SSE 구독 */
    @ApiOperation(value = "SSE 구독", notes = "알림에 멤버ID를 구독합니다.")
    @GetMapping(value = "/subscribe/{memberId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@PathVariable String memberId, @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId){
        UUID uuid = UUID.fromString(memberId);
        return notificationService.subscribe(uuid, lastEventId);
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
