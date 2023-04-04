package com.ssafy.herenft.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.ssafy.herenft.dto.common.response.ResponseSuccessDto;
import com.ssafy.herenft.dto.nft.*;
import com.ssafy.herenft.dto.organ.GetCertAgencyResponseDto;
import com.ssafy.herenft.dto.organ.GetCertHospitalResponseDto;
import com.ssafy.herenft.dto.organ.GetNftRedcrossResponseDto;
import com.ssafy.herenft.entity.CertHistory;
import com.ssafy.herenft.entity.Member;
import com.ssafy.herenft.entity.Nft;
import com.ssafy.herenft.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.herenft.eunmeration.EnumCertHistoryStatus;
import com.ssafy.herenft.eunmeration.EnumNftType;
import com.ssafy.herenft.eunmeration.EnumNotificationCode;
import com.ssafy.herenft.eunmeration.response.HereStatus;
import com.ssafy.herenft.repository.CertHistoryRepository;
import com.ssafy.herenft.repository.MemberRepository;
import com.ssafy.herenft.repository.NftRepository;
import com.ssafy.herenft.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class OrganService {

    private final ResponseUtil responseUtil;
    private final CertHistoryRepository certHistoryRepository;
    private final NftRepository nftRepository;
    private final MemberRepository memberRepository;
    private final RestTemplate restTemplate;
    private final String URI = "https://j8b209.p.ssafy.io:9010/api/notification";

    /* 증명 승인/미승인 목록 조회(기관) */
    public ResponseSuccessDto<List<GetCertAgencyResponseDto>> getCertAgency(UUID agencyId, EnumCertHistoryStatus status) {

        // 초기 선언
        List<CertHistory> certHistoryList = null;

        // 승인/미승인 status에 따라 정렬 기준 다름을 적용
        if (status == EnumCertHistoryStatus.INACTIVE) {
            certHistoryList = certHistoryRepository.findAllByAgencyIdAndStatusOrderByCreatedDateDesc(agencyId, status);
        } else if (status == EnumCertHistoryStatus.ACTIVE) {
            certHistoryList = certHistoryRepository.findAllByAgencyIdAndStatusOrderByUpdatedDateDesc(agencyId, status);
        }

        List<GetCertAgencyResponseDto> result = new ArrayList<>();

        for (CertHistory certHistory : certHistoryList) {
            GetCertAgencyResponseDto getCertAgencyResponseDto = GetCertAgencyResponseDto.builder()
                    .memberName(certHistory.getMember().getName())
                    .reason(certHistory.getReason())
                    .createdDate(certHistory.getCreatedDate())
                    .updatedDate(certHistory.getUpdatedDate())
                    .tokenId(certHistory.getTokenId())
                    .hashValue(certHistory.getHashValue())
                    .build();
            result.add(getCertAgencyResponseDto);
        }

        ResponseSuccessDto<List<GetCertAgencyResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_CERT_LIST_AGENCY);
        return res;
    }

    /* 증명 승인/미승인 목록 조회(병원) */
    public ResponseSuccessDto<List<GetCertHospitalResponseDto>> getCertHospital(UUID hospitalId, EnumCertHistoryStatus status) {

        // 초기 선언
        List<CertHistory> certHistoryList = null;

        // 승인/미승인 status에 따라 정렬 기준 다름을 적용
        if (status == EnumCertHistoryStatus.INACTIVE) {
            certHistoryList = certHistoryRepository.findAllByAgencyIdAndStatusOrderByCreatedDateDesc(hospitalId, status);
        } else if (status == EnumCertHistoryStatus.ACTIVE) {
            certHistoryList = certHistoryRepository.findAllByAgencyIdAndStatusOrderByUpdatedDateDesc(hospitalId, status);
        }

        List<GetCertHospitalResponseDto> result = new ArrayList<>();

        if(certHistoryList.isEmpty()) {
            return responseUtil.successResponse(result, HereStatus.HERE_FIND_CERT_LIST_HOSPITAL);
        }

        String nowName = certHistoryList.get(0).getMember().getName();
        LocalDateTime nowTime = certHistoryList.get(0).getCreatedDate();

        List<NftObjectDto> someoneNfts = new ArrayList<>();

        // 한 번에 제출한 여러 데이터 건들을 묶음 처리
        for (int i = 0; i < certHistoryList.size(); i++) {
            String targetName = certHistoryList.get(i).getMember().getName(); // 현재 순서의 이름 주인공
            LocalDateTime targetTime = certHistoryList.get(i).getCreatedDate(); // 현재 순서의 시간 주인공

            // 만약 마지막 인덱스라면 (마지막 사람)
            // 이때까지 모은 nft 여러개를 묶어서 최종 responsedto에 입힘
            if (i == certHistoryList.size() - 1) {
                NftObjectDto nftObjectDto = NftObjectDto.builder()
                        .tokenId(certHistoryList.get(i).getTokenId())
                        .hashValue(certHistoryList.get(i).getHashValue())
                        .build();
                someoneNfts.add(nftObjectDto);

                GetCertHospitalResponseDto getCertHospitalResponseDto = GetCertHospitalResponseDto.builder()
                        .memberName(certHistoryList.get(i).getMember().getName())
                        .count(someoneNfts.size())
                        .createdDate(certHistoryList.get(i).getCreatedDate())
                        .updatedDate(certHistoryList.get(i).getUpdatedDate())
                        .hashValueList(someoneNfts)
                        .build();

                result.add(getCertHospitalResponseDto);

            // 한번에 제출한 내역이 이어질 경우 (주인공과 같은 이름)
            } else if (targetName.equals(nowName) && (targetTime.isAfter(nowTime.minusMinutes(1)) && targetTime.isBefore(nowTime.plusMinutes(1)))) {
                // nft정보 담는 dto에 담음
                NftObjectDto nftObjectDto = NftObjectDto.builder()
                        .tokenId(certHistoryList.get(i).getTokenId())
                        .hashValue(certHistoryList.get(i).getHashValue())
                        .build();

                // 리스트에 넣고 다음 순서로 감
                someoneNfts.add(nftObjectDto);

            // 만약 주인공과 다른 이름이 등장한다면 (같은 묶음이 아님)
            } else {

                // 현재 인덱스 전까지를 저장
                GetCertHospitalResponseDto getCertHospitalResponseDto = GetCertHospitalResponseDto.builder()
                        .memberName(certHistoryList.get(i - 1).getMember().getName())
                        .count(someoneNfts.size())
                        .createdDate(certHistoryList.get(i - 1).getCreatedDate())
                        .updatedDate(certHistoryList.get(i - 1).getUpdatedDate())
                        .hashValueList(someoneNfts)
                        .build();

                result.add(getCertHospitalResponseDto);

                // nft정보 묶음 초기화
                someoneNfts = new ArrayList<>();
                // 현재 인덱스(처음으로 다른 사람이름이 나온 데이터)의 nft 정보 저장
                NftObjectDto nftObjectDto = NftObjectDto.builder()
                        .tokenId(certHistoryList.get(i).getTokenId())
                        .hashValue(certHistoryList.get(i).getHashValue())
                        .build();

                someoneNfts.add(nftObjectDto);

                // 다음 인덱스가 있는 경우에만 주인공 이름 갱신 (error 방지용)
                if (i + 1 < certHistoryList.size()) {
                    nowName = certHistoryList.get(i + 1).getMember().getName();
                    nowTime = certHistoryList.get(i + 1).getCreatedDate();
                }
            }
        }
        ResponseSuccessDto<List<GetCertHospitalResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_CERT_LIST_HOSPITAL);
        return res;
    }

    /* 발행 목록 조회(적십자) */
    public ResponseSuccessDto<List<GetNftRedcrossResponseDto>> getNftRedcross() {
        List<Nft> nfts = nftRepository.findAllByTypeOrderByCreatedDateDesc(EnumNftType.AGENCY);
        List<GetNftRedcrossResponseDto> result = new ArrayList<>();

        for (Nft nft : nfts) {
            UUID memberId = nft.getIssuerId();
            Member member = memberRepository.findById(memberId)
                    .orElseThrow(() -> new EntityIsNullException("존재하는 회원이 아닙니다."));
            String memberName = member.getName();

            GetNftRedcrossResponseDto getNftRedcrossResponseDto = GetNftRedcrossResponseDto.builder()
                    .tokenId(nft.getTokenId())
                    .memberName(memberName)
                    .createdDate(nft.getCreatedDate())
                    .build();
            result.add(getNftRedcrossResponseDto);
        }

        ResponseSuccessDto<List<GetNftRedcrossResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_REDCROSS);
        return res;
    }

    /* 제출 기록 승인 여부 갱신(기관) */
    public ResponseSuccessDto<UpdateCertAgencyResponseDto> updateCertAgency(UpdateCertAgencyRequestDto updateCertAgencyRequestDto) {
        Long tokenId = updateCertAgencyRequestDto.getTokenId();
        CertHistory certHistory = certHistoryRepository.findByTokenId(tokenId);

        certHistory.updateCertHistory();

        // 기관이 제출 기록 승인했을 때, 발행자에게 알림 등록
        UUID memberId = certHistory.getMember().getId();
        UUID agencyId = certHistory.getAgency().getId();
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));
        Member agency = memberRepository.findById(agencyId).orElseThrow(() -> new EntityIsNullException("해당 기관이 존재하지 않습니다."));
        String message = agency.getName() + "에 제출한 " + member.getNickname() + "님의 헌혈증서가 승인 완료되었습니다.";

        postNotification(agency, member, message, EnumNotificationCode.AGENCY);

        UpdateCertAgencyResponseDto updateCertAgencyResponseDto = UpdateCertAgencyResponseDto.builder()
                .message("제출 기록 승인이 완료되었습니다.")
                .build();

        ResponseSuccessDto<UpdateCertAgencyResponseDto> res = responseUtil.successResponse(updateCertAgencyResponseDto, HereStatus.HERE_UPDATE_CERT_AGENCY);
        return res;
    }

    /* 제출 기록 승인 여부 갱신(병원) */
    public ResponseSuccessDto<UpdateCertHospitalResponseDto> updateCertHospital(UpdateCertHospitalRequestDto updateCertHospitalRequestDto) {
        List<Long> tokenIdList = updateCertHospitalRequestDto.getTokenIdList();

        HashMap<UUID, Integer> issuerMap = new HashMap<UUID, Integer>();
        UUID agencyId = null;

        for (Long tokenId : tokenIdList) {
            CertHistory certHistory = certHistoryRepository.findByTokenId(tokenId);
            certHistory.updateCertHistory();
            agencyId = certHistory.getAgency().getId();

            // 3) nft 최초 발급자에게 해당 병원에 헌혈증이 제출되었다는 알림 등록
            UUID issuerId = nftRepository.findByTokenId(tokenId).getIssuerId(); // 최초 발행자 아이디

            if (issuerMap.containsKey(issuerId)) {
                issuerMap.put(issuerId, issuerMap.get(issuerId) + 1);
            } else {
                issuerMap.put(issuerId, 1);
            }
        }
        System.out.println(issuerMap);

        for (Map.Entry<UUID, Integer> entry : issuerMap.entrySet()) {

            Member issuer = memberRepository.findById(entry.getKey()).orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));

            Member hospital = memberRepository.findById(agencyId).orElseThrow(() -> new EntityIsNullException("해당 병원이 존재하지 않습니다."));

            String message = hospital.getName() + "에 " + issuer.getNickname() + "님의 헌혈증서 " + entry.getValue() + "장이 사용되었습니다.";

            postNotification(hospital, issuer, message, EnumNotificationCode.HOSPITAL);
        }

        UpdateCertHospitalResponseDto updateCertHospitalResponseDto = UpdateCertHospitalResponseDto.builder()
                .message("제출 기록 승인이 완료되었습니다.")
                .build();

        ResponseSuccessDto<UpdateCertHospitalResponseDto> res = responseUtil.successResponse(updateCertHospitalResponseDto, HereStatus.HERE_UPDATE_CERT_HOSPITAL);
        return res;
    }

    // 알림 post 메서드
    private void postNotification(Member sender, Member receiver, String message, EnumNotificationCode code) {
        ObjectNode jsonNodes = JsonNodeFactory.instance.objectNode();

        jsonNodes.put("content", message);
        jsonNodes.put("receiverId", receiver.getId().toString());
        jsonNodes.put("senderId", sender.getId().toString());
        jsonNodes.put("code", code.toString());

        ResponseEntity<JsonNode> postResult = restTemplate.postForEntity(
                "https://j8b209.p.ssafy.io:9013/api/notification",
                jsonNodes,
                JsonNode.class
        );
        System.out.println(postResult.toString());
    }
}
