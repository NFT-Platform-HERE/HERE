package com.ssafy.hereauth.repository;

import com.ssafy.hereauth.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<Member, UUID> {
    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    boolean existsByWalletAddress(String walletAddress);
    Optional<Member> findByEmail(String email);
    Optional<Member> findByWalletAddress(String walletAddress);
}
