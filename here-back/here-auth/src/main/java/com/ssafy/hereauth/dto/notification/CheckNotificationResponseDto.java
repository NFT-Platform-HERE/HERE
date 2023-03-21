package com.ssafy.hereauth.dto.notification;

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
    private UUID senderId;
    private String senderNickname;
    private String content;
}
