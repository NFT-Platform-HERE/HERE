package com.ssafy.hereauth.repository;

import com.ssafy.hereauth.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MemberRepository extends JpaRepository<Member, UUID> {
    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    Boolean existsByWalletAddress(String walletAddress);
}
