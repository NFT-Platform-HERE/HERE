package com.ssafy.hereauth.repository;

import com.ssafy.hereauth.entity.BdHistory;
import com.ssafy.hereauth.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface BdHistoryRepository extends JpaRepository<BdHistory, Long> {
//    @Query("select bdh from BdHistory bdh where bdh.member.id= member_id")
    List<BdHistory> findAllByMemberIdOrderByIssuedDate(UUID memberId);
}
