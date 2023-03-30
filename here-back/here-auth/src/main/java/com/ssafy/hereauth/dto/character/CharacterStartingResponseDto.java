package com.ssafy.hereauth.dto.character;

import com.ssafy.hereauth.entity.Character;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CharacterStartingResponseDto {
    private Long characterId;
    private String characterImgUrl ;
}
