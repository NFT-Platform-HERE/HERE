package com.ssafy.herenotification.dto.common.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseSuccessDto<T> extends ResponseCommonDto {

    private T data;

    @Builder
    public ResponseSuccessDto(ZonedDateTime timeStamp, int code, String status, T data){
        super(timeStamp, code, status);
        this.data = data;
    }
}
