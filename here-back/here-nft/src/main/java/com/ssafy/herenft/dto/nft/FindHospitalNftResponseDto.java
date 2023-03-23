package com.ssafy.herenft.dto.nft;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class FindHospitalNftResponseDto {
    private String issuerName;
    private LocalDate createdDate;

    @QueryProjection
    public FindHospitalNftResponseDto(String issuerName, LocalDate createdDate) {
        this.issuerName = issuerName;
        this.createdDate = createdDate;
    }
}
