package com.ssafy.hereauth.repository;

import com.ssafy.hereauth.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CharacterRepository extends JpaRepository<Character, Long> {
    List<Character> findAllByLevel(int level);
}
