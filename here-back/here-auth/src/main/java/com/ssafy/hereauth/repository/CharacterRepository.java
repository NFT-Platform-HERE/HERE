package com.ssafy.hereauth.repository;

import com.ssafy.hereauth.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterRepository extends JpaRepository<Character, Long> {
}
