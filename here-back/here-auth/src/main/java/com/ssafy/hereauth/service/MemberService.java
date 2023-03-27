package com.ssafy.hereauth.service;

import com.ssafy.hereauth.dto.bdHistory.BdHistoryCreateRequestDto;
import com.ssafy.hereauth.dto.bdHistory.BdHistoryCreateResponseDto;
import com.ssafy.hereauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereauth.dto.member.*;
import com.ssafy.hereauth.entity.*;
import com.ssafy.hereauth.entity.Character;
import com.ssafy.hereauth.enumeration.EnumCharacterType;
import com.ssafy.hereauth.enumeration.EnumMemberRole;
import com.ssafy.hereauth.enumeration.response.HereStatus;
import com.ssafy.hereauth.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.hereauth.repository.*;
import com.ssafy.hereauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.time.Duration;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final ResponseUtil responseUtil;
    private final MemberRepository memberRepository;
    private final CharacterRepository characterRepository;
    private final StampRepository stampRepository;
    private final CertHistoryRepository certHistoryRepository;
    private final BdHistoryRepository bdHistoryRepository;

    /**
     * 회원가입
     */
    public ResponseSuccessDto<SignupResponseDto> signup(SignupRequestDto signupRequestDto) {
        System.out.println("회원가입 서비스단 들어옴");

        /**
         * email 중복 체크
         */
        if (isEmailDuplicate(signupRequestDto.getEmail())) {
            throw new IllegalStateException("이미 존재하는 이메일입니다.");
        }

        /**
         * 회원 저장
         */
        Character character = characterRepository.findById(signupRequestDto.getCharacterId()).orElseThrow(() -> new EntityIsNullException("없는 캐릭터입니다."));

        Member member = new Member();
        member.createMember(character, signupRequestDto);
        memberRepository.save(member); // INSERT 용, 기존에 있으면 UPDATE
        System.out.println(member + "member 세이브 완료");

        // 스탬프
        Stamp stamp = new Stamp();
        stamp.createStamp(member);
        stampRepository.save(stamp);

        // 리턴
        SignupResponseDto signupResponseDto = new SignupResponseDto(member.getId(), member.getNickname(), member.getCharacter().getImgUrl(), "회원가입이 완료되었습니다.");
        ResponseSuccessDto<SignupResponseDto> res = responseUtil.successResponse(signupResponseDto, HereStatus.HERE_SUCCESS_SIGNUP);
        return res;
    }

    /**
     * 멤버 명함 조회
     */
    public ResponseSuccessDto<MemberProfileResponseDto> getProfile(UUID memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 회원입니다."));

        String characterImgUrl = member.getCharacter().getImgUrl();

        // 헌혈기록 리스트 뽑기
        List<BdHistory> bdHistoryList = bdHistoryRepository.findAllByMemberIdOrderByIssuedDate(memberId);

        // 헌혈 카운트
        int bdHistoryCnt = bdHistoryList.size();

        // 최근 헌혈일과 다음 헌혈 가능 날짜 구하기
        LocalDateTime recentBdDate;
        int nextWholeBdDays = 0;
        int nextNotWholeBdDays = 0;

        if (bdHistoryCnt >= 1) {
            recentBdDate = bdHistoryList.get(bdHistoryCnt - 1).getIssuedDate();

            LocalDateTime nextW = recentBdDate.plusWeeks(8);
            LocalDateTime nextNW = recentBdDate.plusWeeks(2);

            Long longNextW = Duration.between(LocalDateTime.now(), nextW).toDays();
            Long longNextNW = Duration.between(LocalDateTime.now(), nextNW).toDays();

            nextWholeBdDays = Long.valueOf(longNextW).intValue();
            nextNotWholeBdDays = Long.valueOf(longNextNW).intValue();

        } else {
            recentBdDate = null;
        }
        // 다음 헌혈 가능 날짜 구하기

        // DTO에 넣기
        MemberProfileResponseDto memberProfileResponseDto = new MemberProfileResponseDto(member, characterImgUrl, bdHistoryCnt, recentBdDate, nextWholeBdDays, nextNotWholeBdDays);
        ResponseSuccessDto<MemberProfileResponseDto> res = responseUtil.successResponse(memberProfileResponseDto, HereStatus.HERE_SUCCESS_FIND_MEMBER);
        return res;
    }

    /**
     * 이메일로 멤버 정보 조회
     */
    public ResponseSuccessDto<MemberInfoResponseDto> getMemberInfo(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 이메일입니다."));

        MemberInfoResponseDto memberInfoResponseDto = new MemberInfoResponseDto(member.getId(), member.getWalletAddress());
        ResponseSuccessDto<MemberInfoResponseDto> res = responseUtil.successResponse(memberInfoResponseDto, HereStatus.HERE_SUCCESS_FIND_MEMBER);
        return res;
    }

    // email 중복 체크
    public ResponseSuccessDto<ValidateEmailResponseDto> checkEmailDuplicate(String email) {
        Boolean isEmailDuplicate = memberRepository.existsByEmail(email);
        System.out.println("이메일 중복됨" + email + isEmailDuplicate);

//        Optional<Member> byEmail = memberRepository.findByEmail(email);

        if (isEmailDuplicate) {
            ValidateEmailResponseDto validateEmailResponseDto = new ValidateEmailResponseDto("이미 사용중인 이메일입니다.");
            ResponseSuccessDto<ValidateEmailResponseDto> res = responseUtil.successResponse(validateEmailResponseDto, HereStatus.HERE_DUPLICATED_EMAIL);
            return res;
        } else {
            ValidateEmailResponseDto validateEmailResponseDto = new ValidateEmailResponseDto("사용 가능한 이메일입니다.");
            ResponseSuccessDto<ValidateEmailResponseDto> res = responseUtil.successResponse(validateEmailResponseDto, HereStatus.HERE_NOT_DUPLICATED_EMAIL);
            return res;
        }
    }

    // nickname 중복 체크(수정)
    public ResponseSuccessDto<ValidateNicknameResponseDto> checkNicknameDuplicate(String nickname) {
        Boolean isNicknameDuplicate = memberRepository.existsByNickname(nickname);
        System.out.println("닉네임 중복됨" + nickname + isNicknameDuplicate);
        if (isNicknameDuplicate) {
            ValidateNicknameResponseDto validateNicknameResponseDto = new ValidateNicknameResponseDto("이미 사용중인 닉네임입니다.");
            ResponseSuccessDto<ValidateNicknameResponseDto> res = responseUtil.successResponse(validateNicknameResponseDto, HereStatus.HERE_DUPLICATED_NICKNAME);
            return res;
        } else {
            ValidateNicknameResponseDto validateNicknameResponseDto = new ValidateNicknameResponseDto("사용 가능한 닉네임입니다.");
            ResponseSuccessDto<ValidateNicknameResponseDto> res = responseUtil.successResponse(validateNicknameResponseDto, HereStatus.HERE_NOT_DUPLICATED_NICKNAME);
            return res;
        }
    }

    // 회원가입 여부 확인
    public ResponseSuccessDto<IsMemberResponseDto> checkIsMember(String walletAddress) {

        Optional<Member> byWalletAddress = memberRepository.findByWalletAddress(walletAddress);
        Boolean isMember = memberRepository.existsByWalletAddress(walletAddress);
        System.out.println("존재하는 지갑주소 정보임" + walletAddress + isMember);

        if (byWalletAddress.isEmpty()) {
            IsMemberResponseDto isMemberResponseDto = new IsMemberResponseDto(null, null, null, null, "등록된 회원이 아닙니다.");
            ResponseSuccessDto<IsMemberResponseDto> res = responseUtil.successResponse(isMemberResponseDto, HereStatus.HERE_NOT_SUCCESS_FIND_MEMBER);
            return res;
        }
        Member member = byWalletAddress.get();
        IsMemberResponseDto isMemberResponseDto = new IsMemberResponseDto(member.getRole(), member.getId(), member.getNickname(), member.getCharacter().getImgUrl(),"등록된 회원입니다.");
        ResponseSuccessDto<IsMemberResponseDto> res = responseUtil.successResponse(isMemberResponseDto, HereStatus.HERE_SUCCESS_FIND_MEMBER);
        return res;
    }

    // 회원가입시 이메일 중복 이중 체크 용 메소드
    public boolean isEmailDuplicate(String email) {
        System.out.println("들어옴" + email);
        return memberRepository.existsByEmail(email);
    }

    /**
     * 경험치 상승
     */
    public ResponseSuccessDto<ExpUpdateResponseDto> updateExp(ExpUpdateRequestDto expUpdateRequestDto) {
        Member member = memberRepository.findById(expUpdateRequestDto.getMemberId())
                .orElseThrow(() -> new EntityIsNullException("올바르지 않은 멤버ID입니다."));

        int curExp = member.getCurExp() + expUpdateRequestDto.getExp();
        System.out.println("멤버" + member);
        System.out.println("현재 경험지" + curExp);

        int goalExp = member.getGoalExp();
        int level = member.getLevel();
        Character character = member.getCharacter();

        boolean isLevelUp = false;
        if (curExp >= goalExp) {
            goalExp += 50;
            level += 1;
            isLevelUp = true;

            EnumCharacterType curCharacterType = member.getCharacter().getType();
            if (level <= 6) {
                character = characterRepository.findByTypeAndLevel(curCharacterType, level);
            }
        }
        member.updateMemberExp(character, curExp, goalExp, level);

        ExpUpdateResponseDto expUpdateResponseDto = new ExpUpdateResponseDto(level, "경험치가 상승하였습니다.");
        ResponseSuccessDto<ExpUpdateResponseDto> res = responseUtil.successResponse(expUpdateResponseDto, isLevelUp? HereStatus.HERE_UPDATE_LEVEL : HereStatus.HERE_UPDATE_EXP);
        return res;
    }

    /**
     * (임시) CertHistory 생성
     */
    public ResponseSuccessDto<CertHistoryCreateResponseDto> createCertHistory(CertHistoryCreateRequestDto certHistoryCreateRequestDto) {

        // 멤버 가져오기
        Member member = memberRepository.findById(certHistoryCreateRequestDto.getMemberId())
                .orElseThrow(() -> new EntityIsNullException("잘못된 회원 ID입니다."));

        // 기관 가져오기
        Member agency = memberRepository.findById(certHistoryCreateRequestDto.getAgencyId())
                .orElseThrow(() -> new EntityIsNullException("잘못된 기관 ID입니다."));

        CertHistory certHistory = new CertHistory();
        certHistory.createCertHistory(member, agency, certHistoryCreateRequestDto);
        certHistoryRepository.save(certHistory);

        // 리턴
        CertHistoryCreateResponseDto certHistoryCreateResponseDto = new CertHistoryCreateResponseDto("헌혈증 제출이 완료되었습니다.");
        ResponseSuccessDto<CertHistoryCreateResponseDto> res = responseUtil.successResponse(certHistoryCreateResponseDto, HereStatus.HERE_SUBMIT_CERTIFICATION);
        return res;
    }

    /**
     * (임의) BdHistory 생성
     */
    public ResponseSuccessDto<BdHistoryCreateResponseDto> createBdHistory(BdHistoryCreateRequestDto bdHistoryCreateRequestDto) {

        // 멤버 가져오기
        Member member = memberRepository.findById(bdHistoryCreateRequestDto.getMemberId())
                .orElseThrow(() -> new EntityIsNullException("잘못된 회원 ID입니다."));

        BdHistory bdHistory = new BdHistory();
        bdHistory.createBdHistory(member, bdHistoryCreateRequestDto);
        bdHistoryRepository.save(bdHistory);

        // 리턴
        BdHistoryCreateResponseDto bdHistoryCreateResponseDto = new BdHistoryCreateResponseDto("헌혈 기록 등록 완료되었습니다.");
        ResponseSuccessDto<BdHistoryCreateResponseDto> res = responseUtil.successResponse(bdHistoryCreateResponseDto, HereStatus.HERE_SUBMIT_CERTIFICATION);
        return res;
    }

    /**
     * 스탬프 정보 조회
     */
    public ResponseSuccessDto<StampGetResponseDto> getStampInfo(UUID memberId) {

        Stamp stampInfo = stampRepository.findByMemberId(memberId);
        System.out.println(stampInfo);

        StampGetResponseDto stampGetResponseDto = StampGetResponseDto.builder()
                .stage(stampInfo.getStage())
                .step(stampInfo.getStep())
                .build();

        ResponseSuccessDto<StampGetResponseDto> res = responseUtil.successResponse(stampGetResponseDto, HereStatus.HERE_FIND_STAMP);
        return res;
    }

    /**
     * 증명서 제출 기관/병원 검색
     */
    public ResponseSuccessDto<List<OrganSearchResponseDto>> searchOrgan(EnumMemberRole organType,String query) {

        List<Member> searchedOrgans = memberRepository.findByRoleAndNameContains(organType, query);
        List<OrganSearchResponseDto> result = new ArrayList<>();

        for (Member organ : searchedOrgans) {

            OrganSearchResponseDto organSearchResponseDto = OrganSearchResponseDto.builder()
                    .agencyId(organ.getId())
                    .agencyName(organ.getName())
                    .build();
            result.add(organSearchResponseDto);
        }

        ResponseSuccessDto<List<OrganSearchResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_SEARCH_ORGAN);
        return res;
    }

}
