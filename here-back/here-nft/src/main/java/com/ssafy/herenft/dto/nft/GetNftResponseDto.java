package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetNftResponseDto {
    private String nftId;
    private String imgUrl;
}
