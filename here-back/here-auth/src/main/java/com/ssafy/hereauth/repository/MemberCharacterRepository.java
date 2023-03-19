package com.ssafy.hereauth.repository;

import com.ssafy.hereauth.entity.MemberCharacter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MemberCharacterRepository extends JpaRepository<MemberCharacter, Long> {
    Optional<MemberCharacter> findByMemberId(UUID memberId);
}
