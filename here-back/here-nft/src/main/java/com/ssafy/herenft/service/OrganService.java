package com.ssafy.herenft.service;

import com.ssafy.herenft.dto.common.response.ResponseSuccessDto;
import com.ssafy.herenft.dto.nft.GetDonateNftCntResponseDto;
import com.ssafy.herenft.dto.nft.NftObjectDto;
import com.ssafy.herenft.dto.organ.GetCertAgencyResponseDto;
import com.ssafy.herenft.dto.organ.GetCertHospitalResponseDto;
import com.ssafy.herenft.dto.organ.GetNftRedcrossResponseDto;
import com.ssafy.herenft.entity.CertHistory;
import com.ssafy.herenft.entity.Member;
import com.ssafy.herenft.entity.Nft;
import com.ssafy.herenft.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.herenft.eunmeration.EnumCertHistoryStatus;
import com.ssafy.herenft.eunmeration.EnumNftType;
import com.ssafy.herenft.eunmeration.response.HereStatus;
import com.ssafy.herenft.repository.CertHistoryRepository;
import com.ssafy.herenft.repository.MemberRepository;
import com.ssafy.herenft.repository.NftRepository;
import com.ssafy.herenft.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
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
    private final NftRepository nftRepository;
    private final MemberRepository memberRepository;

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

    /* 증명 승인/미승인 목록 조회(병원) */
    public ResponseSuccessDto<List<GetCertHospitalResponseDto>> getCertHospital(UUID hospitalId, EnumCertHistoryStatus status) {
        System.out.println("서비스 단" + hospitalId + status);

        List<CertHistory> certHistoryList = certHistoryRepository.findAllByAgencyIdAndStatusOrderByCreatedDateDesc(hospitalId, status);
        System.out.println("히스토리 리스트" + certHistoryList);
        List<GetCertHospitalResponseDto> result = new ArrayList<>();

        String nowName = certHistoryList.get(0).getMember().getName();
        System.out.println("나우네임" + nowName);
        List<NftObjectDto> someoneNfts = new ArrayList<>();

        for (int i = 0; i < certHistoryList.size(); i++) {
            String targetName = certHistoryList.get(i).getMember().getName();
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
                        .hashValueList(someoneNfts)
                        .build();

                result.add(getCertHospitalResponseDto);
            } else if (targetName.equals(nowName)) {
                System.out.println("현재 인덱스-------------" + i);
                System.out.println("현재 네임과 타겟 네임이 같습니다");
                System.out.println(targetName + " " + nowName);
                NftObjectDto nftObjectDto = NftObjectDto.builder()
                        .tokenId(certHistoryList.get(i).getTokenId())
                        .hashValue(certHistoryList.get(i).getHashValue())
                        .build();
                someoneNfts.add(nftObjectDto);
                System.out.println("추가된 것" + nftObjectDto.getHashValue());
                System.out.println("지금까지 완성된 nfts" + someoneNfts);

            } else {
                System.out.println("현재 인덱스-------------" + i);
                GetCertHospitalResponseDto getCertHospitalResponseDto = GetCertHospitalResponseDto.builder()
                        .memberName(certHistoryList.get(i - 1).getMember().getName())
                        .count(someoneNfts.size())
                        .createdDate(certHistoryList.get(i - 1).getCreatedDate())
                        .hashValueList(someoneNfts)
                        .build();

                result.add(getCertHospitalResponseDto);
                System.out.println("리절트 확인" + result);

                someoneNfts = new ArrayList<>();

                NftObjectDto nftObjectDto = NftObjectDto.builder()
                        .tokenId(certHistoryList.get(i).getTokenId())
                        .hashValue(certHistoryList.get(i).getHashValue())
                        .build();
                someoneNfts.add(nftObjectDto);
                System.out.println("한 번 바뀌고 난 someNfts" + someoneNfts);
                if (i + 1 < certHistoryList.size()) {
                    nowName = certHistoryList.get(i + 1).getMember().getName();
                }
            }

        }
        ResponseSuccessDto<List<GetCertHospitalResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_CERT_LIST_HOSPITAL);
        return res;
    }

    /* 증명 승인/미승인 목록 조회(기관) */
    public ResponseSuccessDto<List<GetNftRedcrossResponseDto>> getNftRedcross() {

        List<Nft> nfts = nftRepository.findAll(Sort.by(Sort.Direction.DESC, "createdDate"));
        List<GetNftRedcrossResponseDto> result = new ArrayList<>();

        for (Nft nft : nfts) {
            UUID memberId = nft.getIssuerId();
            Member member = memberRepository.findById(memberId)
                    .orElseThrow(() -> new EntityIsNullException("존재하는 회원이 아닙니다."));
            String memberName = member.getName();

            GetNftRedcrossResponseDto getNftRedcrossResponseDto = GetNftRedcrossResponseDto.builder()
                    .memberName(memberName)
                    .createdDate(nft.getCreatedDate())
                    .build();
            result.add(getNftRedcrossResponseDto);
        }

        ResponseSuccessDto<List<GetNftRedcrossResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_REDCROSS);
        return res;
    }
}
