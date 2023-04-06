package com.ssafy.herenotification.dto.notification;

import com.ssafy.herenotification.enumeration.EnumNotificationCode;
import com.ssafy.herenotification.enumeration.EnumNotificationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckNotificationResponseDto {
    private Long notificationId;
    private String content;
    private UUID senderId;
    private String senderNickname;
    private List<UUID> memberIdList;
    private EnumNotificationStatus status;
    private EnumNotificationCode code;
}
