package com.ssafy.herenft.service;

import com.ssafy.herenft.dto.common.response.ResponseSuccessDto;
import com.ssafy.herenft.dto.nft.*;
import com.ssafy.herenft.entity.BdHistory;
import com.ssafy.herenft.entity.CertHistory;
import com.ssafy.herenft.entity.Member;
import com.ssafy.herenft.entity.Nft;
import com.ssafy.herenft.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.herenft.eunmeration.EnumNftType;
import com.ssafy.herenft.eunmeration.response.HereStatus;
import com.ssafy.herenft.repository.BdHistoryRepository;
import com.ssafy.herenft.repository.CertHistoryRepository;
import com.ssafy.herenft.repository.MemberRepository;
import com.ssafy.herenft.repository.NftRepository;
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
public class NftService {

    private final ResponseUtil responseUtil;
    private final NftRepository nftRepository;
    private final BdHistoryRepository bdHistoryRepository;
    private final MemberRepository memberRepository;
    private final CertHistoryRepository certHistoryRepository;

    /* NFT 생성 */
    public ResponseSuccessDto<SaveNftResponseDto> save(SaveNftRequestDto saveNftRequestDto) {
        System.out.println("서비스단 들어옴" + saveNftRequestDto);
        Member member = memberRepository.findById(saveNftRequestDto.getIssuerId())
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 회원 ID입니다."));

        Nft nft1 = new Nft().createNft(saveNftRequestDto, EnumNftType.AGENCY);
        nftRepository.save(nft1);

        Nft nft2 = new Nft().createNft(saveNftRequestDto, EnumNftType.HOSPITAL);
        nftRepository.save(nft2);

        BdHistory bdHistory = new BdHistory().createBdHistory(member, saveNftRequestDto);
        bdHistoryRepository.save(bdHistory);

        SaveNftResponseDto saveNftResponseDto = SaveNftResponseDto.builder()
                .message("NFT 등록 성공")
                .build();

        ResponseSuccessDto<SaveNftResponseDto> res = responseUtil.successResponse(saveNftResponseDto, HereStatus.HERE_CREATE_NFT);
        return res;
    }

    /* NFT 목록 조회 */
    public ResponseSuccessDto<List<GetNftResponseDto>> getNftList(UUID memberId) {
        List<Nft> myNftList = nftRepository.findAllByIssuerId(memberId);

        List<GetNftResponseDto> result = new ArrayList<>();

        for (Nft myNft : myNftList) {
            GetNftResponseDto getNftResponseDto = GetNftResponseDto.builder()
                    .tokenID(myNft.getTokenId())
                    .hashValue(myNft.getHashValue())
                    .imgUrl(myNft.getImgUrl())
                    .build();
            result.add(getNftResponseDto);
        }

        ResponseSuccessDto<List<GetNftResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_NFT_LIST);
        return res;
    }

    /* 기관 증명서 제출 */
    public ResponseSuccessDto<SubmitCertAgencyResponseDto> submitCertAgency(SubmitCertAgencyRequestDto submitCertAgencyRequestDto) {

        Member member = memberRepository.findById(submitCertAgencyRequestDto.getMemberId())
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 회원 ID입니다."));

        Member agency = memberRepository.findById(submitCertAgencyRequestDto.getAgencyId())
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 기관 ID입니다."));

        CertHistory certHistory = new CertHistory().createCertHistoryAgency(member, agency, submitCertAgencyRequestDto);
        certHistoryRepository.save(certHistory);

        SubmitCertAgencyResponseDto submitCertAgencyResponseDto = SubmitCertAgencyResponseDto.builder()
                .message("증명서 기관 제출 성공")
                .build();

        ResponseSuccessDto<SubmitCertAgencyResponseDto> res = responseUtil.successResponse(submitCertAgencyResponseDto, HereStatus.HERE_SUBMIT_CERTIFICATION);
        return res;
    }

    /* 병원 증명서 제출 */
    public ResponseSuccessDto<SubmitCertHospitalResponseDto> submitCertHospital(SubmitCertHospitalRequestDto submitCertHospitalRequestDto) {

        Member member = memberRepository.findById(submitCertHospitalRequestDto.getMemberId())
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 회원 ID입니다."));

        Member agency = memberRepository.findById(submitCertHospitalRequestDto.getAgencyId())
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 기관 ID입니다."));

        List<NftObjectDto> nftList = submitCertHospitalRequestDto.getNftList();

        System.out.println("확인" + nftList);

        for (NftObjectDto nft : nftList) {
            CertHistory certHistory = new CertHistory().createCertHistoryHospital(member, agency, submitCertHospitalRequestDto, nft);
            certHistoryRepository.save(certHistory);
        }

//        CertHistory certHistory = new CertHistory().createCertHistoryHospital(member, agency, submitCertHospitalRequestDto);
//        certHistoryRepository.save(certHistory);
//
        SubmitCertHospitalResponseDto submitCertHospitalResponseDto = SubmitCertHospitalResponseDto.builder()
                .message("증명서 병원 제출 성공")
                .build();
//
        ResponseSuccessDto<SubmitCertHospitalResponseDto> res = responseUtil.successResponse(submitCertHospitalResponseDto, HereStatus.HERE_SUBMIT_CERTIFICATION);
        return res;
    }
}
