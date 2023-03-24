package com.ssafy.herenft.repository;

import com.ssafy.herenft.entity.BdHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BdHistoryRepository extends JpaRepository<BdHistory, Long>, BdHistoryRepositoryCustom {
}
