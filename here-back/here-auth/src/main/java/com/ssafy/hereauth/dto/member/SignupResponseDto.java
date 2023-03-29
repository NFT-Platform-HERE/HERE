package com.ssafy.hereauth.dto.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignupResponseDto {
    private UUID memberId;
    private String nickname;
    private String characterImgUrl;
    private String message;

}
