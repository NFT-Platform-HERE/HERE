package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetNftToOrganResponseDto {
    private String memberName;
    private LocalDateTime createdDate;
}
