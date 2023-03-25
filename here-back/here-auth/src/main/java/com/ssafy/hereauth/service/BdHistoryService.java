package com.ssafy.hereauth.service;

import com.ssafy.hereauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereauth.dto.bdHistory.BdHistoryGetResponseDto;
import com.ssafy.hereauth.entity.BdHistory;
import com.ssafy.hereauth.enumeration.response.HereStatus;
import com.ssafy.hereauth.repository.BdHistoryRepository;
import com.ssafy.hereauth.repository.MemberRepository;
import com.ssafy.hereauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BdHistoryService {

    private final ResponseUtil responseUtil;
    private final MemberRepository memberRepository;
    private final BdHistoryRepository bdHistoryRepository;

    /**
     * 헌혈 기록 조회
     */
    public ResponseSuccessDto<List<BdHistoryGetResponseDto>> getBdHistory(UUID memberId) {
        System.out.println("서비스 들어옴");

        List<BdHistory> bdHistories = bdHistoryRepository.findAllByMemberIdOrderByIssuedDate(memberId);

        List<BdHistoryGetResponseDto> result = new ArrayList<>();

        for (BdHistory bdHistory : bdHistories) {
            BdHistoryGetResponseDto bdHistoryGetResponseDto = BdHistoryGetResponseDto.builder()
                    .bdHistoryId(bdHistory.getId())
                    .issuedDate(bdHistory.getIssuedDate())
                    .place(bdHistory.getPlace())
                    .bdType(bdHistory.getBdType())
                    .build();
            result.add(bdHistoryGetResponseDto);
        }

        ResponseSuccessDto<List<BdHistoryGetResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_SUBMIT_CERTIFICATION);
        return res;
    }
}
