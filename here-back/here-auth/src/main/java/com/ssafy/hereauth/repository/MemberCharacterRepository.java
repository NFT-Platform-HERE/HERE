package com.ssafy.hereauth.repository;

import com.ssafy.hereauth.entity.MemberCharacter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberCharacterRepository extends JpaRepository<MemberCharacter, Long> {
}
