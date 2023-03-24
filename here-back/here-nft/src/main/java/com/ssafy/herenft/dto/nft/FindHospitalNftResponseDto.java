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
    private String issuerName;
    private LocalDateTime createdDate;

    @QueryProjection
    public FindHospitalNftResponseDto(String issuerName, LocalDateTime createdDate) {
        this.issuerName = issuerName;
        this.createdDate = createdDate;
    }
}
