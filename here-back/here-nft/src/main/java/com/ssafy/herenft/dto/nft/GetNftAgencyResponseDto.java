package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetNftAgencyResponseDto {
    private Long tokenId;
    private String hashValue;
    private String place;
    private LocalDateTime createdDate;
    private Boolean isOwner;
}
