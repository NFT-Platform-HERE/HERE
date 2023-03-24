package com.ssafy.herenft.dto.nft;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FindDonationResponseDto {
    private Long tokenId;

    @QueryProjection
    public FindDonationResponseDto(Long tokenId) {
        this.tokenId = tokenId;
    }
}
