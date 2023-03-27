package com.ssafy.herenft.dto.nft;

import com.ssafy.herenft.eunmeration.EnumBdHistoryType;
import com.ssafy.herenft.eunmeration.EnumNftType;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class SaveNftRequestDto {

    private Long tokenId;
    private String hashValue;
    private UUID ownerId;
    private UUID issuerId;
    private String imgUrl;
    private String place;
    private EnumNftType type;
    private EnumBdHistoryType bdType;       // NFT 등록하고 나서 헌혈기록도 같이 기록되니까 넣어둠
}
