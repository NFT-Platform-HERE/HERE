package com.ssafy.herenotification.dto.notification;

import com.ssafy.herenotification.entity.Notification;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Schema(description = "알림 Dto")
@Getter
@Setter
public class ResponseNotificationDto {
    private Long id;
    private String content;
    private String url;
    private Boolean isRead;
    private String createdAt;

    @Builder
    public ResponseNotificationDto(Notification notification) {
        this.id = notification.getId();
        this.content = notification.getContent();
        this.url = notification.getUrl();
        this.isRead = notification.getIsRead();
        this.createdAt = LocalDateTimeConverter.timeToString(notification.getCreatedAt());
    }

}