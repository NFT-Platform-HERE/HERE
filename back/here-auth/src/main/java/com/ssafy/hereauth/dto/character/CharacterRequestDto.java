package com.ssafy.hereauth.dto.character;

import com.ssafy.hereauth.enumeration.character.EnumCharacterType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CharacterRequestDto {

    private EnumCharacterType type;
    private String imgUrl;
}
