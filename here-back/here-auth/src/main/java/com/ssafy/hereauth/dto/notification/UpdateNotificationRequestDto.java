package com.ssafy.hereauth.dto.notification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateNotificationRequestDto {
    private Long notificationId;
    private UUID memberId;
}
