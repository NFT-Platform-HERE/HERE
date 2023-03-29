package com.ssafy.herenft.dto.nft;

import com.querydsl.core.annotations.QueryProjection;
import com.querydsl.core.types.dsl.DatePath;
import com.querydsl.core.types.dsl.DateTimePath;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class FindHospitalNftResponseDto {
    private Long tokenId;
    private String issuerName;
    private LocalDateTime createdDate;

    @QueryProjection
    public FindHospitalNftResponseDto(Long tokenId, String issuerName, LocalDateTime createdDate) {
        this.tokenId = tokenId;
        this.issuerName = issuerName;
        this.createdDate = createdDate;
    }
}
