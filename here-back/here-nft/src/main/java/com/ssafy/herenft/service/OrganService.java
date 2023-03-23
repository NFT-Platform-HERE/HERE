package com.ssafy.herenft.service;

import com.ssafy.herenft.dto.common.response.ResponseSuccessDto;
import com.ssafy.herenft.dto.nft.SaveNftRequestDto;
import com.ssafy.herenft.dto.nft.SaveNftResponseDto;
import com.ssafy.herenft.dto.organ.GetCertAgencyResponseDto;
import com.ssafy.herenft.entity.BdHistory;
import com.ssafy.herenft.entity.CertHistory;
import com.ssafy.herenft.entity.Member;
import com.ssafy.herenft.entity.Nft;
import com.ssafy.herenft.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.herenft.eunmeration.EnumCertHistoryStatus;
import com.ssafy.herenft.eunmeration.EnumNftType;
import com.ssafy.herenft.eunmeration.response.HereStatus;
import com.ssafy.herenft.repository.CertHistoryRepository;
import com.ssafy.herenft.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class OrganService {

    private final ResponseUtil responseUtil;
    private final CertHistoryRepository certHistoryRepository;

    /* 증명 승인/미승인 목록 조회(기관) */
    public ResponseSuccessDto<List<GetCertAgencyResponseDto>> getCertAgency(UUID agencyId, EnumCertHistoryStatus status) {

        List<CertHistory> certHistoryList = certHistoryRepository.findAllByAgencyIdAndStatusOrderByCreatedDateDesc(agencyId, status);
        List<GetCertAgencyResponseDto> result = new ArrayList<>();

        for (CertHistory certHistory : certHistoryList) {
            GetCertAgencyResponseDto getCertAgencyResponseDto = GetCertAgencyResponseDto.builder()
                    .memberName(certHistory.getMember().getName())
                    .reason(certHistory.getReason())
                    .createdDate(certHistory.getCreatedDate())
                    .tokenId(certHistory.getTokenId())
                    .hashValue(certHistory.getHashValue())
                    .build();
            result.add(getCertAgencyResponseDto);
        }

        ResponseSuccessDto<List<GetCertAgencyResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_CERT_LIST_AGENCY);
        return res;
    }
}
