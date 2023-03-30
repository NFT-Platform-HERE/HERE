package com.ssafy.hereauth.dto.member;

import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Getter
public class ExpUpdateRequestDto {
    @NotNull(message = "memberId는 필수 값입니다.")
    private UUID memberId;
    @NotNull(message = "경험치는 필수 값입니다.")
    private int exp;
}
