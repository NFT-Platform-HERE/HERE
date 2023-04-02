package com.ssafy.herenft.dto.nft;

import com.ssafy.herenft.eunmeration.EnumPaperBdCertBdType;
import com.ssafy.herenft.eunmeration.EnumPaperBdCertBlood;
import com.ssafy.herenft.eunmeration.EnumPaperBdCertGenderType;
import com.ssafy.herenft.eunmeration.EnumPaperBdCertRhType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class SavePaperBdCertToNftResponseDto {
    private String name;
    private EnumPaperBdCertGenderType genderType;
    private EnumPaperBdCertBdType bloodType;
    private EnumPaperBdCertBlood blood;
    private EnumPaperBdCertRhType rhType;
    private int bloodVolume;
    private String walletAddress;
    private LocalDate birth;
    private LocalDate bdDate;
    private String place;
}
