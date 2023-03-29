package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetNftResponseDto {
    private Long id;
    private Long tokenID;
    private String hashValue;
    private String imgUrl;
}
