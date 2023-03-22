package com.ssafy.herenft.dto.nft;

import com.ssafy.herenft.eunmeration.EnumNftType;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class SaveNftRequestDto {
    private String hashValue;
    private UUID ownerId;
    private UUID issuerId;
    private String imgUrl;
    private String place;
    private EnumNftType type;
}
