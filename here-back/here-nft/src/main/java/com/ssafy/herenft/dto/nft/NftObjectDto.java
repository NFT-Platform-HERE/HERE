package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NftObjectDto {
    private Long tokenId;
    private String hashValue;
}
