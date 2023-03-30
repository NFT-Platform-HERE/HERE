package com.ssafy.hereauth.dto.character;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetStartingCharacterResponseDto {
    private Long characterId;
    private String characterImgUrl ;
}
