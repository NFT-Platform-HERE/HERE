package com.ssafy.hereauth.dto.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignupRequestDto {
    @NotBlank(message = "지갑 주소는 필수 값입니다.")
    private String walletAddress;
    @NotBlank(message = "이름은 필수 값입니다.")
    private String name;
    @NotBlank(message = "닉네임은 필수 값입니다.")
    private String nickname;
    @NotNull(message = "이메일은 필수 입력 값입니다.")
    @NotBlank(message = "이메일 값을 입력해주세요.")
    @Email(message = "이메일 형식이 아닙니다.")
    private String email;
    @NotNull(message = "캐릭터 이름은 필수 값입니다.")
    @NotBlank(message = "캐릭터 이름을 입력해주세요.")
    private String characterName;
    @NotNull(message = "characterId는 필수 값입니다.")
    private Long characterId;
}
