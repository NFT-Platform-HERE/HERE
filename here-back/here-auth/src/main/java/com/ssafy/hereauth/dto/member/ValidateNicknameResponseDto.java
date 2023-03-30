package com.ssafy.hereauth.dto.member;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ValidateNicknameResponseDto {
    private String message;
}
