package com.ssafy.hereauth.dto.character;

import com.ssafy.hereauth.entity.Character;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CharacterStartingResponseDto {
    private Long characterId;
    private String characterImgUrl ;

    public CharacterStartingResponseDto(Character character) {
        characterId = character.getId();
        characterImgUrl = character.getImgUrl();
    }
}
