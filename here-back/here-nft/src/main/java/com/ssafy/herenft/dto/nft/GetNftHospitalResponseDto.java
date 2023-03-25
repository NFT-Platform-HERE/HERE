package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetNftHospitalResponseDto {
    private String name;
    private LocalDateTime createdDate;
    private boolean isOwner;
}
