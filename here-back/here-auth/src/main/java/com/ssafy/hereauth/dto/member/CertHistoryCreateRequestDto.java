package com.ssafy.hereauth.dto.member;

import com.ssafy.hereauth.enumeration.EnumCertHistoryStatus;
import com.ssafy.hereauth.enumeration.EnumCertHistoryType;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Getter
public class CertHistoryCreateRequestDto {
    @NotNull(message = "memberId는 필수 값입니다.")
    private UUID memberId;
    @NotNull(message = "agencyId는 필수 값입니다.")
    private UUID agencyId;
    @NotNull(message = "type은 필수 값입니다.")
    @NotBlank(message = "type을 입력해주세요")
    private EnumCertHistoryType type;
    @NotNull(message = "status는 필수 값입니다.")
    @NotBlank(message = "status를 입력해주세요.")
    private EnumCertHistoryStatus status;
    @NotNull(message = "사유는 필수 값입니다.")
    @NotBlank(message = "사유를 입력해주세요.")
    private String reason;
    @NotNull(message = "해쉬값은 필수 값입니다.")
    @NotBlank(message = "해쉬값을 입력해주세요.")
    private String hashValue;
}
