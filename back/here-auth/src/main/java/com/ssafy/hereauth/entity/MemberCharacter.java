package com.ssafy.hereauth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.hereauth.dto.member.SignupRequestDto;
import com.ssafy.hereauth.enumeration.member.EnumMemberRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "member_character")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberCharacter {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "int unsigned", nullable = false)
    private Long id;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "character_id", nullable = false)
    private Character character;

    @Column(name = "name", columnDefinition = "char(20)", nullable = false)
    private String name;

    public void createMemberCharacter(Member member, Character character, String characterName) {
        this.member = member;
        this.name = characterName;
        this.character = character;

    }
}
