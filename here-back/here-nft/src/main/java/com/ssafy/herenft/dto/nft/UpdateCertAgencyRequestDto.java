package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateCertAgencyRequestDto {
    private Long tokenId;
}
