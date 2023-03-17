package com.ssafy.hereboard.dto.common.response;

import lombok.Builder;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class ResponseErrorDto<T> extends ResponseCommonDto {

    private String path;
    private T error;

    @Builder
    public ResponseErrorDto(ZonedDateTime timeStamp, int code, String status, String path, T error){
        super(timeStamp, code, status);
        this.path = path;
        this.error = error;
    }
}
