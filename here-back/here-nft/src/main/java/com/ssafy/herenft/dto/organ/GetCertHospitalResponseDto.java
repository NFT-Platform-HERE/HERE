package com.ssafy.herenft.dto.organ;

import com.ssafy.herenft.dto.nft.NftObjectDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class GetCertHospitalResponseDto {
    private String memberName;
    private int count;
    private LocalDateTime createdDate;
    private List<NftObjectDto> nftList;
}
