package com.ssafy.herenft.repository;

import com.ssafy.herenft.entity.CertHistory;
import com.ssafy.herenft.eunmeration.EnumCertHistoryStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CertHistoryRepository extends JpaRepository<CertHistory, Long> {
    List<CertHistory> findAllByAgencyIdAndStatusOrderByCreatedDateDesc(UUID agencyId, EnumCertHistoryStatus status);

    CertHistory findByTokenId(Long tokenId);
}
