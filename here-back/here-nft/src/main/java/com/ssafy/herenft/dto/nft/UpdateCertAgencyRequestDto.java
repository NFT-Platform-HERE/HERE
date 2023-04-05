package com.ssafy.herenft.dto.nft;

import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Getter
public class UpdateCertAgencyRequestDto {
    @NotNull(message = "토큰 ID는 필수 값입니다.")
    private Long tokenId;
    @NotNull(message = "기관 ID는 필수 값입니다.")
    private UUID agencyId;
}
