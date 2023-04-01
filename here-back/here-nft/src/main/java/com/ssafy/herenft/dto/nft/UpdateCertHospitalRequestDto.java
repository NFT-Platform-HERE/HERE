package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class UpdateCertHospitalRequestDto {
    private List<Long> tokenIdList;
}
