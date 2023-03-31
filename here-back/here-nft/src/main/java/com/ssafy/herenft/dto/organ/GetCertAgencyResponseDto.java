package com.ssafy.herenft.dto.organ;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetCertAgencyResponseDto {
    private String memberName;
    private String reason;
    private LocalDateTime createdDate;
    private Long tokenId;
    private String hashValue;
}
