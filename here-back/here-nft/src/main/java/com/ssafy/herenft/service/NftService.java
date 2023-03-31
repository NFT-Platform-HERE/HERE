package com.ssafy.herenft.service;

import com.ssafy.herenft.dto.common.response.ResponseSuccessDto;
import com.ssafy.herenft.dto.nft.*;
import com.ssafy.herenft.entity.*;
import com.ssafy.herenft.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.herenft.eunmeration.EnumNftType;
import com.ssafy.herenft.eunmeration.response.HereStatus;
import com.ssafy.herenft.repository.*;
import com.ssafy.herenft.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
    private final StampRepository stampRepository;

    /* NFT 생성 */
    public ResponseSuccessDto<SaveNftResponseDto> save(@Valid SaveNftRequestDto saveNftRequestDto) {
        Member member = memberRepository.findById(saveNftRequestDto.getIssuerId())
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 회원 ID입니다."));

        Nft nft = new Nft();
        nft.createNft(saveNftRequestDto);
        nftRepository.save(nft);

        Boolean isLevelUp = false;

        // 어제, 오늘 날짜 범위 설정
        LocalDateTime before = LocalDateTime.now().minusMinutes(2);
        LocalDateTime after = LocalDateTime.now().plusMinutes(2);

        // 어제 오늘 날짜 범위안에 같은 이슈어 아이디인 nft 찾기
        Optional<BdHistory> byIssuerIdAndCreatedDateBetween = bdHistoryRepository.findTop1ByMemberIdAndIssuedDateBetween(nft.getIssuerId(), before, after);

        // 한 번 민팅된 nft가 없으면, 즉 현재 민팅 nft가 첫번째 민팅 경우라면
        if (byIssuerIdAndCreatedDateBetween.isEmpty()) {
            // 1) 헌혈 기록 생성
            BdHistory bdHistory = new BdHistory();
            bdHistory.createBdHistory(member, saveNftRequestDto);
            bdHistoryRepository.save(bdHistory);

            // 2) 스탬프 정보 업데이트
            Stamp stamp = stampRepository.findByMemberId(member.getId());

            if (stamp.getStep() + 1 >= 7) {
                stamp.updateStamp(member, stamp.getStage() + 1, 1);
                isLevelUp = true;
            } else {
                stamp.updateStamp(member, stamp.getStage(), stamp.getStep() + 1);
            }
        }

        SaveNftResponseDto saveNftResponseDto = SaveNftResponseDto.builder()
                .message("NFT 등록 성공")
                .isLevelUp(isLevelUp)
                .build();

        ResponseSuccessDto<SaveNftResponseDto> res = responseUtil.successResponse(saveNftResponseDto, HereStatus.HERE_CREATE_NFT);
        return res;
    }

    /* MY NFT 목록 조회 */
    public ResponseSuccessDto<List<GetNftResponseDto>> getNftList(UUID memberId) {
        List<Nft> myNftList = nftRepository.findAllByIssuerIdAndType(memberId, EnumNftType.AGENCY);
        List<GetNftResponseDto> result = new ArrayList<>();

        for (Nft myNft : myNftList) {
            GetNftResponseDto getNftResponseDto = GetNftResponseDto.builder()
                    .tokenId(myNft.getTokenId())
                    .hashValue(myNft.getHashValue())
                    .imgUrl(myNft.getImgUrl())
                    .build();
            result.add(getNftResponseDto);
        }
        ResponseSuccessDto<List<GetNftResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_NFT_LIST);
        return res;
    }

    /* (기관) 내 증명서 제출 */
    public ResponseSuccessDto<SubmitCertAgencyResponseDto> submitCertAgency(SubmitCertAgencyRequestDto submitCertAgencyRequestDto) {

        Member member = memberRepository.findById(submitCertAgencyRequestDto.getMemberId())
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 회원 ID입니다."));

        Member agency = memberRepository.findById(submitCertAgencyRequestDto.getAgencyId())
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 기관 ID입니다."));

        CertHistory certHistory = new CertHistory();
        certHistory.createCertHistoryAgency(member, agency, submitCertAgencyRequestDto);
        certHistoryRepository.save(certHistory);

        SubmitCertAgencyResponseDto submitCertAgencyResponseDto = SubmitCertAgencyResponseDto.builder()
                .message("증명서 기관 제출 성공")
                .build();

        ResponseSuccessDto<SubmitCertAgencyResponseDto> res = responseUtil.successResponse(submitCertAgencyResponseDto, HereStatus.HERE_SUBMIT_CERTIFICATION);
        return res;
    }

    /* (병원) 내 증명서 제출 */
    public ResponseSuccessDto<SubmitCertHospitalResponseDto> submitCertHospital(SubmitCertHospitalRequestDto submitCertHospitalRequestDto) {

        Member member = memberRepository.findById(submitCertHospitalRequestDto.getMemberId())
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 회원 ID입니다."));

        Member agency = memberRepository.findById(submitCertHospitalRequestDto.getAgencyId())
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 병원 ID입니다."));

        List<NftObjectDto> nftList = submitCertHospitalRequestDto.getNftList();

        for (NftObjectDto nft : nftList) {
            CertHistory certHistory = new CertHistory();
            certHistory.createCertHistoryHospital(member, agency, nft);
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

        List<Nft> donateNfts = nftRepository.findAllByOwnerIdAndType(senderId, EnumNftType.HOSPITAL);

        GetDonateNftCntResponseDto getDonateNftCntResponseDto = GetDonateNftCntResponseDto.builder()
                .cnt(donateNfts.size())
                .build();

        ResponseSuccessDto<GetDonateNftCntResponseDto> res = responseUtil.successResponse(getDonateNftCntResponseDto, HereStatus.HERE_FIND_DONATE_CNT);
        return res;
    }

    /* 헌혈증 소유권 이전 */
    public ResponseSuccessDto<TransferOwnershipResponseDto> transferNftOwnership(TransferOwnershipRequestDto transferOwnershipRequestDto) {
        UUID senderId = transferOwnershipRequestDto.getSenderId();
        UUID receiverId = transferOwnershipRequestDto.getReceiverId();
        List<Long> nftTokenList = transferOwnershipRequestDto.getNftTokenList();

        for (Long nftToken : nftTokenList) {
            Nft nft = nftRepository.findByTokenId(nftToken);
            nft.updateOwnership(receiverId);
        }

        TransferOwnershipResponseDto transferOwnershipResponseDto = TransferOwnershipResponseDto.builder()
                .message("헌혈증 소유권 이전이 완료되었습니다.")
                .build();
        ResponseSuccessDto<TransferOwnershipResponseDto> res = responseUtil.successResponse(transferOwnershipResponseDto, HereStatus.HERE_TRANSFER_OWNERSHIP);
        return res;
    }

    /* 기관용/병원용 NFT 목록 조회 */
    public ResponseSuccessDto<List<?>> getNftListToSubmit(UUID memberId, EnumNftType organType) {
        List<Nft> nftList;
        HereStatus status = null;

        if (organType == EnumNftType.AGENCY) {
            nftList = nftRepository.findAllByIssuerIdAndType(memberId, EnumNftType.AGENCY);
        } else if (organType == EnumNftType.HOSPITAL) {
            nftList = nftRepository.findAllByOwnerIdAndType(memberId, EnumNftType.HOSPITAL);
        } else {
            throw new RuntimeException("잘못된 organType 입니다.");
        }

        List result = new ArrayList<>();

        for (Nft nft : nftList) {
            System.out.println("@@@ createdDate @@@");
            System.out.println(nft.toString());
            System.out.println("id = " + nft.getId());
            System.out.println("tokenId = " + nft.getTokenId());
            System.out.println(nft.getCreatedDate());
            UUID issuerId = nft.getIssuerId();
            Member issuer = memberRepository.findById(issuerId)
                    .orElseThrow(() -> new EntityIsNullException("존재하지 않는 회원 ID입니다."));

            Boolean isOwner;

            isOwner = issuerId.equals(memberId);

            if(organType == EnumNftType.HOSPITAL) {
                GetNftHospitalResponseDto getNftHospitalResponseDto = GetNftHospitalResponseDto.builder()
                        .tokenId(nft.getTokenId())
                        .hashValue(nft.getHashValue())
                        .name(issuer.getName())
                        .createdDate(nft.getCreatedDate())
                        .isOwner(isOwner)
                        .build();
                result.add(getNftHospitalResponseDto);
                status = HereStatus.HERE_FIND_NFT_LIST_HOSPITAL;
            } else {
                BdHistory bdHistory = bdHistoryRepository.findBdHistory(issuer, nft.getCreatedDate());
                GetNftAgencyResponseDto getNftAgencyResponseDto = GetNftAgencyResponseDto.builder()
                        .tokenId(nft.getTokenId())
                        .hashValue(nft.getHashValue())
                        .place(bdHistory.getPlace())
                        .createdDate(nft.getCreatedDate())
                        .isOwner(isOwner)
                        .build();
                result.add(getNftAgencyResponseDto);
                status = HereStatus.HERE_FIND_NFT_LIST_AGENCY;
            }
        }
        ResponseSuccessDto<List<?>> res = responseUtil.successResponse(result, status != null ? status:HereStatus.HERE_NOT_FOUND_NFT_LIST);
        return res;
    }

    /* 기부/병원 제출용 자동선택 NFT 목록 조회 */
    public ResponseSuccessDto<List<FindHospitalNftResponseDto>> findHospitalNftList(UUID memberId, int count) {
        List<Nft> hospitalNftAutoList = nftRepository.findHospitalNftAuto(memberId, count);
        List<FindHospitalNftResponseDto> result = new ArrayList<>();
        for (Nft nft : hospitalNftAutoList) {
            Member findMember = memberRepository.findById(nft.getIssuerId()).orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));
            FindHospitalNftResponseDto findHospitalNftResponseDto = FindHospitalNftResponseDto.builder()
                    .tokenId(nft.getTokenId())
                    .issuerName(findMember.getName())
                    .createdDate(nft.getCreatedDate())
                    .build();
            result.add(findHospitalNftResponseDto);
        }

        ResponseSuccessDto<List<FindHospitalNftResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_NFT_LIST_HOSPITAL);
        return res;
    }
}
