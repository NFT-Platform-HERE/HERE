package com.ssafy.herenft.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.ssafy.herenft.dto.common.response.ResponseSuccessDto;
import com.ssafy.herenft.dto.nft.*;
import com.ssafy.herenft.entity.*;
import com.ssafy.herenft.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.herenft.eunmeration.EnumBoardStatus;
import com.ssafy.herenft.eunmeration.EnumNftType;
import com.ssafy.herenft.eunmeration.EnumNotificationCode;
import com.ssafy.herenft.eunmeration.response.HereStatus;
import com.ssafy.herenft.repository.*;
import com.ssafy.herenft.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

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
    private final NftHistoryRepository nftHistoryRepository;
    private final BdHistoryRepository bdHistoryRepository;
    private final MemberRepository memberRepository;
    private final CertHistoryRepository certHistoryRepository;
    private final StampRepository stampRepository;
    private final BoardBdHistoryRepository boardBdHistoryRepository;
    private final BoardRepository boardRepository;
    private final RestTemplate restTemplate;
    private final String URI = "https://j8b209.p.ssafy.io:9013/api/notification";
    private final PaperBdCertRepository paperBdCertRepository;

    /* NFT 생성 */
    public ResponseSuccessDto<SaveNftResponseDto> save(@Valid SaveNftRequestDto saveNftRequestDto) {
        Member member = memberRepository.findById(saveNftRequestDto.getIssuerId())
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 회원 ID입니다."));

        Nft nft = new Nft();
        nft.createNft(saveNftRequestDto);
        nftRepository.save(nft);

        NftHistory nftHistory = new NftHistory();
        nftHistory.createNftHistory(nft.getId(), member.getId());
        nftHistoryRepository.save(nftHistory);

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

        List<NftObjectDto> nftList = submitCertHospitalRequestDto.getHashValueList();

        // 제출기록 db에 nft 하나씩 insert하면서 소유권 이전 작업
        for (NftObjectDto nft : nftList) {
            // 1) 제출 기록 row 하나 생성
            CertHistory certHistory = new CertHistory();
            certHistory.createCertHistoryHospital(member, agency, nft);
            certHistoryRepository.save(certHistory);

            // 2) 해당 nft를 멤버에서 병원으로 소유권 이전하기
            Nft subjectNft = nftRepository.findByTokenId(nft.getTokenId());
            subjectNft.updateOwnership(submitCertHospitalRequestDto.getAgencyId());
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

    /* 기부용 헌혈증 소유권 이전 + 기부 내역 등록 */
    public ResponseSuccessDto<DonateNftResponseDto> donateNft(DonateNftRequestDto donateNftRequestDto) {
        Long boardId = donateNftRequestDto.getBoardId();
        UUID senderId = donateNftRequestDto.getSenderId();
        UUID receiverId = donateNftRequestDto.getReceiverId();
        List<Long> nftTokenList = donateNftRequestDto.getNftTokenList();

        // 1) 소유권 이전 + NFT 소유권 history
        for (Long nftToken : nftTokenList) {
            Nft nft = nftRepository.findByTokenId(nftToken);
            nft.updateOwnership(receiverId);

            NftHistory nftHistory = new NftHistory();
            nftHistory.createNftHistory(nft.getId(), receiverId);
            nftHistoryRepository.save(nftHistory);
        }

        // 2) 주인공 boardBdHistory 가져와서 기부 내역 등록
        BoardBdHistory subjectBoardBdHistory = boardBdHistoryRepository.findByBoardIdAndSenderId(boardId, senderId);

        if (subjectBoardBdHistory == null) {
            // 이 게시글에 아직 기부한 적 없는 사람
            BoardBdHistory boardBdHistory = new BoardBdHistory();
            boardBdHistory.createBoardBdHistory(donateNftRequestDto);
            boardBdHistoryRepository.save(boardBdHistory);
        } else {
            int newQuantity = subjectBoardBdHistory.getQuantity() + donateNftRequestDto.getNftTokenList().size();
            subjectBoardBdHistory.updateBoardBdHistory(newQuantity);
        }

        // 3) 게시글 현재 수량 갱신
        Board board = boardRepository.findById(donateNftRequestDto.getBoardId())
                .orElseThrow(() -> new EntityIsNullException("해당 게시글이 존재하지 않습니다."));
        int donateCnt = donateNftRequestDto.getNftTokenList().size();
        board.updateCurQuantity(donateCnt);

        // 현재 수량이 목표 수량을 넘어가면 마감 처리
        if (board.getCurQuantity() >= board.getGoalQuantity()) {
            board.updateBoardStatus(EnumBoardStatus.INACTIVE);

            // 현재 마감 처리된 board에 기부된 기부리스트 가져오기 (게시글과 기부자 기준으로 distinct)
            List<BoardBdHistory> boardBdHistoryList = boardBdHistoryRepository.findAllByBoardId(boardId);
            System.out.println(boardBdHistoryList.toString());

            for (BoardBdHistory eachBoardBdHistory : boardBdHistoryList) {
                Member receiver = memberRepository.findById(eachBoardBdHistory.getSenderId())
                        .orElseThrow(() -> new EntityIsNullException("알림 수신자가 존재하지 않습니다."));
                Member sender = board.getMember();
                String message = receiver.getNickname() + "님께서 기부하신 " + sender.getNickname() + "님의 게시글이 마감되었습니다.";

                log.info("receiver : {}", receiver.getNickname());
                log.info("sender : {}", sender.getNickname());
                System.out.println("receiver = " + receiver.getNickname());
                System.out.println("sender = " + sender.getNickname());

                postNotification(sender, receiver, message, EnumNotificationCode.CLOSED);
            }

        }

        // 4) 게시글 작성자에게 기부 받은 내용 알림 등록
        Member receiver = board.getMember();
        Member sender = memberRepository.findById(senderId).orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));
        String message = sender.getNickname() + "님께서 " + donateCnt + "개 기부하셨습니다!";

        postNotification(sender, receiver, message, EnumNotificationCode.DONATED);

        // Response Dto 생성
        DonateNftResponseDto donateNftResponseDto = DonateNftResponseDto.builder()
                .message("기부한 헌혈증 소유권 이전이 완료되었습니다.")
                .build();
        ResponseSuccessDto<DonateNftResponseDto> res = responseUtil.successResponse(donateNftResponseDto, HereStatus.HERE_TRANSFER_OWNERSHIP);
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
                GetNftAgencyResponseDto getNftAgencyResponseDto = GetNftAgencyResponseDto.builder()
                        .tokenId(nft.getTokenId())
                        .hashValue(nft.getHashValue())
                        .place(nft.getPlace())
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
    public ResponseSuccessDto<List<FindHospitalNftResponseDto>> findNftListAuto(UUID memberId, int count) {
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

    /* 종이헌혈증서 NFT 발급 */
    public ResponseSuccessDto<SavePaperBdCertToNftResponseDto> savePaperBdCertToNft(UUID memberId, String serialNumber) {

        PaperBdCert paperBdCert = paperBdCertRepository.findById(serialNumber)
                .orElseThrow(() -> new EntityIsNullException("해당 정보와 일치하는 헌혈 기록이 없습니다."));
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 회원입니다."));

        SavePaperBdCertToNftResponseDto savePaperBdCertToNftResponseDto = SavePaperBdCertToNftResponseDto.builder()
                .name(paperBdCert.getName())
                .genderType(paperBdCert.getGenderType())
                .bloodType(paperBdCert.getBloodType())
                .blood(paperBdCert.getBlood())
                .rhType(paperBdCert.getRhType())
                .bloodVolume(paperBdCert.getBloodVolume())
                .walletAddress(member.getWalletAddress())
                .birth(paperBdCert.getBirth())
                .bdDate(paperBdCert.getBdDate())
                .place(paperBdCert.getPlace())
                .build();

        ResponseSuccessDto<SavePaperBdCertToNftResponseDto> res = responseUtil.successResponse(savePaperBdCertToNftResponseDto, HereStatus.HERE_FIND_PAPER_BD_CERT);
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
                URI,
                jsonNodes,
                JsonNode.class
        );
    }
}
