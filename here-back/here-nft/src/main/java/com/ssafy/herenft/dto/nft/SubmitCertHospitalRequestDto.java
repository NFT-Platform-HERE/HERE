package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
@Builder
public class SubmitCertHospitalRequestDto {
    private UUID memberId;
    private UUID agencyId;
    private List<NftObjectDto> nftList;

}
