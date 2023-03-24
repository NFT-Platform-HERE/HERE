package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetNftAgencyResponseDto {
    private String place;
    private LocalDateTime createdDate;
    private boolean isOwner;
}
