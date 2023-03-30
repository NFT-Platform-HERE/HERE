package com.ssafy.hereauth.dto.member;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ValidateEmailResponseDto {
    private String message;
}
