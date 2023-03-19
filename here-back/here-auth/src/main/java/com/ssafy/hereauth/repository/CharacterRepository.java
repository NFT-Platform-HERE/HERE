package com.ssafy.hereauth.repository;

import com.ssafy.hereauth.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CharacterRepository extends JpaRepository<Character, Long> {
    @Query("select c from Character c where c.level= 1")
    List<Character> findCharacterStarting(int level);
}
