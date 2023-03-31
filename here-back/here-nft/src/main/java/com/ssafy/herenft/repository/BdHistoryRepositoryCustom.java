package com.ssafy.herenft.repository;

import com.ssafy.herenft.entity.BdHistory;
import com.ssafy.herenft.entity.Member;

import java.time.LocalDateTime;

public interface BdHistoryRepositoryCustom {
    BdHistory findBdHistory(Member member, LocalDateTime issuedDate);
}
