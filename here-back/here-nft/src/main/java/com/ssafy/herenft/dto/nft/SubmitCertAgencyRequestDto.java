package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class SubmitCertAgencyRequestDto {
    private UUID memberId;
    private UUID agencyId;
    private String reason;
    private String hashValue;
    private Long tokenId;
}
