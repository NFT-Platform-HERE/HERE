package com.ssafy.herenotification.dto;

import com.ssafy.herenotification.dto.notification.ResponseNotificationDto;
import com.ssafy.herenotification.entity.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SseMapStruct {
    SseMapStruct SSE_MAPPER = Mappers.getMapper(SseMapStruct.class);

    ResponseNotificationDto NotificationtoResponseNotificationDto(Notification notification);

}