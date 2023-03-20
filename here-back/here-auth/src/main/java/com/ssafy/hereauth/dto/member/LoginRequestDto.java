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
public class LoginRequestDto {
    @NotBlank(message = "이메일은 필수 값입니다.")
    @Email(message = "이메일 형식이 아닙니다.")
    private String email;
    @NotNull(message = "pw값은 필수 값입니다.")
    @NotBlank(message = "pw값을 입력해주세요.")
    private String pw;
}
