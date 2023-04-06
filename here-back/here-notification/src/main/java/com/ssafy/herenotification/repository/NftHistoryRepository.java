package com.ssafy.herenotification.repository;

import com.ssafy.herenotification.entity.NftHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NftHistoryRepository extends JpaRepository<NftHistory, Long> {
    List<NftHistory> findAllByNftId(Long nftId);
}
