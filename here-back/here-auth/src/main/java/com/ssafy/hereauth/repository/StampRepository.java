package com.ssafy.hereauth.repository;

import com.ssafy.hereauth.entity.Stamp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StampRepository extends JpaRepository<Stamp, Long> {
    Stamp findByMemberId(UUID memberId);
}
