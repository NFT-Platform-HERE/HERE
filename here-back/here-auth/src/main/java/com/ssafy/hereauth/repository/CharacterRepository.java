package com.ssafy.hereauth.repository;

import com.ssafy.hereauth.entity.Character;
import com.ssafy.hereauth.enumeration.EnumCharacterType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CharacterRepository extends JpaRepository<Character, Long> {
    List<Character> findAllByLevel(int level);

    Character findByTypeAndLevel(EnumCharacterType curCharacterType, int level);
}
