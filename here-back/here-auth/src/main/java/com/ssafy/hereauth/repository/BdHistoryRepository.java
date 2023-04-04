package com.ssafy.hereauth.repository;

import com.ssafy.hereauth.entity.BdHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BdHistoryRepository extends JpaRepository<BdHistory, Long> {
    List<BdHistory> findAllByMemberIdOrderByIssuedDate(UUID memberId);
}
