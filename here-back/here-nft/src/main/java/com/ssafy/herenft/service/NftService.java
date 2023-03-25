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

        SubmitCertHospitalResponseDto submitCertHospitalResponseDto = SubmitCertHospitalResponseDto.builder()
                .message("증명서 병원 제출 성공")
                .build();
        ResponseSuccessDto<SubmitCertHospitalResponseDto> res = responseUtil.successResponse(submitCertHospitalResponseDto, HereStatus.HERE_SUBMIT_CERTIFICATION);
        return res;
    }

    /* 기부 해시값 개수 조회 */
    public ResponseSuccessDto<GetDonateNftCntResponseDto> getDonateNftCnt(UUID senderId) {

        List<Nft> donateNfts = nftRepository.findAllByOwnerId(senderId);

        GetDonateNftCntResponseDto getDonateNftCntResponseDto = GetDonateNftCntResponseDto.builder()
                .cnt(donateNfts.size())
                .build();

        ResponseSuccessDto<GetDonateNftCntResponseDto> res = responseUtil.successResponse(getDonateNftCntResponseDto, HereStatus.HERE_FIND_DONATE_CNT);
        return res;
    }

    /* 증명서 소유권 이전 (해시값 자동 선택) */
    public ResponseSuccessDto<List<FindDonationResponseDto>> findDonationList(FindDonationRequestDto findDonationRequestDto) {
        List<FindDonationResponseDto> result = nftRepository.findDonationList(findDonationRequestDto.getSenderId(), findDonationRequestDto.getQuantity());
        ResponseSuccessDto<List<FindDonationResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_DONATION);
        return res;
    }


    /* 기관용/병원용 NFT 목록 조회 */
    public ResponseSuccessDto<List> getNftToOrgan(UUID memberId, EnumNftType organType) {
        List<Nft> nftList = new ArrayList<>();
        HereStatus status = null;

        if (organType == EnumNftType.AGENCY) {
            nftList = nftRepository.findAllByIssuerId(memberId);
        } else if (organType == EnumNftType.HOSPITAL) {
            nftList = nftRepository.findAllByOwnerId(memberId);
        } else {
            throw new RuntimeException("잘못된 organType 입니다!");
        }

        List result = new ArrayList<>();

        for (Nft nft : nftList) {
            UUID issuerId = nft.getIssuerId();
            Member issuer = memberRepository.findById(issuerId)
                    .orElseThrow(() -> new EntityIsNullException("존재하지 않는 회원 ID입니다."));

            boolean isOwner;

            isOwner = issuerId.equals(memberId);

            if(organType == EnumNftType.HOSPITAL) {
                GetNftHospitalResponseDto getNftHospitalResponseDto = GetNftHospitalResponseDto.builder()
                        .name(issuer.getName())
                        .createdDate(nft.getCreatedDate())
                        .isOwner(isOwner)
                        .build();
                result.add(getNftHospitalResponseDto);
                status = HereStatus.HERE_FIND_NFT_LIST_HOSPITAL;
            } else {
                BdHistory bdHistory = bdHistoryRepository.findBdHistory(issuer, nft.getCreatedDate());
                GetNftAgencyResponseDto getNftAgencyResponseDto = GetNftAgencyResponseDto.builder()
                        .place(bdHistory.getPlace())
                        .createdDate(nft.getCreatedDate())
                        .isOwner(isOwner)
                        .build();
                result.add(getNftAgencyResponseDto);
                status = HereStatus.HERE_FIND_NFT_LIST_AGENCY;
            }

        }

        ResponseSuccessDto<List> res = responseUtil.successResponse(result, status);
        return res;
    }

    /* 병원 제출용 자동선택 NFT 목록 조회 */
    public ResponseSuccessDto<List<FindHospitalNftResponseDto>> findHospitalNftList(UUID memberId, int count) {
        List<Nft> hospitalNftAutoList = nftRepository.findHospitalNftAuto(memberId, count);
        List<FindHospitalNftResponseDto> result = new ArrayList<>();
        for (Nft nft : hospitalNftAutoList) {
            Member findMember = memberRepository.findById(nft.getIssuerId()).orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));
            FindHospitalNftResponseDto findHospitalNftResponseDto = FindHospitalNftResponseDto.builder()
                    .issuerName(findMember.getName())
                    .createdDate(nft.getCreatedDate())
                    .build();
            result.add(findHospitalNftResponseDto);
        }

        ResponseSuccessDto<List<FindHospitalNftResponseDto>> res = responseUtil.successResponse(hospitalNftAutoList, HereStatus.HERE_FIND_NFT_LIST_HOSPITAL);
        return res;
    }
}
