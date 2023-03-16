package com.ssafy.hereauth.dto.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SignupResponseDto {
    private String message; // 회원가입 성공하면 프론트한테 보내줄 메세지... 추가로 데이터가 필요할 것 같다면 그거에 맞춰서 필드를 넣어줘야 함
}
