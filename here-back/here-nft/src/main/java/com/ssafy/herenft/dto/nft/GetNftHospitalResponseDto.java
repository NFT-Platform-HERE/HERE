package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetNftHospitalResponseDto {
    private Long tokenId;
    private String hashValue;
    private String name;
    private LocalDateTime createdDate;
    private Boolean isOwner;
}
