package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class SavePaperBdCertToNftResponseDto {
    private String name;
    private String genderType;
    private String bloodType;
    private String blood;
    private String rhType;
    private int bloodVolume;
    private String walletAddress;
    private LocalDate birth;
    private LocalDate bdDate;
    private String place;
}
