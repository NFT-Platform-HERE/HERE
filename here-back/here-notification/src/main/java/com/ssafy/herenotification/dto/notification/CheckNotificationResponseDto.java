package com.ssafy.herenotification.dto.notification;

import com.ssafy.herenotification.enumeration.EnumNotificationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckNotificationResponseDto {
    private Long notificationId;
    private UUID senderId;
    private String senderNickname;
    private EnumNotificationStatus status;
    private String content;
}
