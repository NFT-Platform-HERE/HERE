package com.ssafy.herenotification.dto.notification;

import com.ssafy.herenotification.entity.Member;
import com.ssafy.herenotification.entity.Notification;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ResponseNotificationDto {
//    private UUID sender;
//    private UUID receiver;
    private String content;
//    private String url;
//    private Boolean isRead;
//    private String createdAt;

    @Builder
    public ResponseNotificationDto(Notification notification) {
       // this.sender = notification.getSender().getId();
       // this.receiver = notification.getReceiver().getId();
        this.content = notification.getContent();
//        this.url = notification.getUrl();
//        this.isRead = notification.getIsRead();
//        this.createdAt = LocalDateTimeConverter.timeToString(notification.getCreatedAt());
    }

}