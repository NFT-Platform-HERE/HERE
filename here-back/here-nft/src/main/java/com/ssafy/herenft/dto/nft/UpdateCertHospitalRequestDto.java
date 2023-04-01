package com.ssafy.herenft.dto.nft;

import lombok.Getter;

import java.util.List;

@Getter
public class UpdateCertHospitalRequestDto {
    private List<Long> tokenIdList;
}
