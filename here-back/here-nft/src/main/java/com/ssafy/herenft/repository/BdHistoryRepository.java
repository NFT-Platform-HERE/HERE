package com.ssafy.herenft.repository;

import com.ssafy.herenft.entity.BdHistory;
import com.ssafy.herenft.entity.Nft;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public interface BdHistoryRepository extends JpaRepository<BdHistory, Long>, BdHistoryRepositoryCustom {

    Optional<BdHistory> findTop1ByMemberIdAndIssuedDateBetween(UUID issuerId, LocalDateTime yesterday, LocalDateTime tomorrow);
}
