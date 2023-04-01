package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Getter
@Builder
public class SubmitCertAgencyRequestDto {
    @NotNull(message = "멤버 ID는 필수 값입니다.")
    private UUID memberId;
    @NotNull(message = "제출 기관은 필수 값입니다.")
    private UUID agencyId;
    @NotNull(message = "인증 사유는 필수 값입니다.")
    @NotBlank(message = "인증 사유를 입력해주세요.")
    private String reason;
    @NotNull(message = "해시값은 필수 값입니다.")
    @NotBlank(message = "해시값을 입력해주세요.")
    private String hashValue;
    @NotNull(message = "토큰 ID는 필수 값입니다.")
    private Long tokenId;
}
