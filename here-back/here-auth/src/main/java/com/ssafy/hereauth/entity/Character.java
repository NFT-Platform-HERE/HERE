package com.ssafy.hereauth.entity;

import com.ssafy.hereauth.dto.character.CharacterRequestDto;
import com.ssafy.hereauth.enumeration.EnumCharacterType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "characters")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Character {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "int unsigned", nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", columnDefinition = "char(20)", nullable = false)
    private EnumCharacterType type;

    @Column(name = "level", columnDefinition = "int default 1", nullable = false)
    private int level = 1;

    @Column(name = "img_url", columnDefinition = "varchar(200)", nullable = false)
    private String imgUrl;

    public void createCharacter(CharacterRequestDto characterRequestDto) {
        this.type = characterRequestDto.getType();
        this.imgUrl = characterRequestDto.getImgUrl();
    }
}
