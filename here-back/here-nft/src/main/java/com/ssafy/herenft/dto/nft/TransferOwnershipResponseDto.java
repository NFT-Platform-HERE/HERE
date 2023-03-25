package com.ssafy.herenft.dto.nft;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TransferOwnershipResponseDto {
    private String message;
}
