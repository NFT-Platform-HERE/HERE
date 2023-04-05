package com.ssafy.herenft.repository;

import com.ssafy.herenft.entity.NftHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NftHistoryRepository extends JpaRepository<NftHistory, Long> {
}
