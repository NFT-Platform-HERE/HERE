package com.ssafy.herenft.dto.organ;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetNftRedcrossResponseDto {
    private String memberName;
    private LocalDateTime createdDate;
}
