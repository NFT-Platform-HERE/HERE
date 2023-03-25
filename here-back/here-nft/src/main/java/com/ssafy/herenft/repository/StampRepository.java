package com.ssafy.herenft.repository;

import com.ssafy.herenft.entity.Stamp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StampRepository extends JpaRepository<Stamp, Long> {
    Stamp findByMemberId(UUID id);
}
