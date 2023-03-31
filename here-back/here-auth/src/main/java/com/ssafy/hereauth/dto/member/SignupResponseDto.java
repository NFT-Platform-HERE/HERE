package com.ssafy.hereauth.dto.member;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class SignupResponseDto {
    private UUID memberId;
    private String nickname;
    private String characterImgUrl;
    private String message;

}
