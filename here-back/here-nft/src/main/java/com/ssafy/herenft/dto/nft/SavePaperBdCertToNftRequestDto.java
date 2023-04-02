package com.ssafy.herenft.dto.nft;

import lombok.Getter;

import java.util.UUID;

@Getter
public class SavePaperBdCertToNftRequestDto {
    private String serialNumber;
    private UUID memberId;
}
