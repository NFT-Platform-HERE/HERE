package com.ssafy.hereauth.dto.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignupRequestDto {
    private String walletAddress;
    private String name;
    private String nickname;
    @NotBlank(message = "이메일은 필수 입력 값입니다.")
    private String email;
    private String pw;
    private String characterName;
    private Long characterId;
}
