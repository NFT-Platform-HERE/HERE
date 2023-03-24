package com.ssafy.hereauth.dto.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SignupResponseDto {
    private String nickname;
    private String characterImgUrl;
    private String message;

}
