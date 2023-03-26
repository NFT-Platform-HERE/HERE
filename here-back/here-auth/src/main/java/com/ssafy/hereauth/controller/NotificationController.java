package com.ssafy.hereauth.controller;

import com.ssafy.hereauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereauth.dto.notification.*;
import com.ssafy.hereauth.service.NotificationService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Api("Member Controller v1")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/notification")
@Validated
public class NotificationController {
    private final NotificationService notificationService;

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
