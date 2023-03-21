package com.ssafy.hereauth.service;

import com.ssafy.hereauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereauth.dto.member.*;
import com.ssafy.hereauth.entity.*;
import com.ssafy.hereauth.entity.Character;
import com.ssafy.hereauth.enumeration.response.HereStatus;
import com.ssafy.hereauth.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.hereauth.repository.*;
import com.ssafy.hereauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
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
    private final MemberCharacterRepository memberCharacterRepository;
    private final CharacterRepository characterRepository;
    private final StampRepository stampRepository;
    private final CertHistoryRepository certHistoryRepository;
    private final BdHistoryRepository bdHistoryRepository;

    /**
     * 회원가입
     */
    public ResponseSuccessDto<SignupResponseDto> signup(SignupRequestDto signupRequestDto) {

        /**
         * email 중복 체크
         */
        if (isEmailDuplicate(signupRequestDto.getEmail())) {
            throw new IllegalStateException("이미 존재하는 이메일입니다.");
        }

        /**
         * 회원 저장
         */
        Member member = new Member();
        member.createMember(signupRequestDto);
        memberRepository.save(member); // INSERT 용, 기존에 있으면 UPDATE

        // 멤버_캐릭터 : 멤버 만들고 멤버 만들면 자동으로 만들어지는 것? (원투원 매핑)
        MemberCharacter memberCharacter = new MemberCharacter();
        Character character = characterRepository.findById(signupRequestDto.getCharacterId()).orElseThrow(() -> new EntityIsNullException("없는 캐릭터입니다."));
        memberCharacter.createMemberCharacter(member, character, signupRequestDto.getCharacterName());
        memberCharacterRepository.save(memberCharacter);

        // 스탬프
        Stamp stamp = new Stamp();
        stamp.createStamp(member);
        stampRepository.save(stamp);

        // 리턴
        SignupResponseDto signupResponseDto = new SignupResponseDto("회원가입이 완료되었습니다.");
        ResponseSuccessDto<SignupResponseDto> res = responseUtil.successResponse(signupResponseDto, HereStatus.HERE_SUCCESS_SIGNUP);
        return res;
    }

    /**
     * 멤버 명함 조회
     */
    public ResponseSuccessDto<MemberProfileResponseDto> getProfile(String memberId) {
        Member member = memberRepository.findById(UUID.fromString(memberId))
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 회원입니다."));

        // 캐릭터 imgUrl 가져오기 위해 멤버_캐릭터 테이블에서 멤버 id에 해당하는 캐릭터 id 가져오기
        MemberCharacter memberCharacter = memberCharacterRepository.findByMemberId(UUID.fromString(memberId))
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 멤버의 캐릭터 정보입니다."));

        Character character = memberCharacter.getCharacter();

        String characterImgUrl = character.getImgUrl();

        // 헌혈기록 리스트 뽑기
        List<BdHistory> bdHistoryList = bdHistoryRepository.findAllByMemberIdOrderByIssuedDate(UUID.fromString(memberId));

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

        MemberInfoResponseDto memberInfoResponseDto = new MemberInfoResponseDto(member.getName(), member.getWalletAddress());
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
            ResponseSuccessDto<ValidateEmailResponseDto> res = responseUtil.successResponse(validateEmailResponseDto, HereStatus.HERE_SUCCESS_FIND_MEMBER);
            return res;
        } else {
            ValidateEmailResponseDto validateEmailResponseDto = new ValidateEmailResponseDto("사용 가능한 이메일입니다.");
            ResponseSuccessDto<ValidateEmailResponseDto> res = responseUtil.successResponse(validateEmailResponseDto, HereStatus.HERE_NOT_SUCCESS_FIND_MEMBER);
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
            System.out.println("여기여기" + byWalletAddress);
            IsMemberResponseDto isMemberResponseDto = new IsMemberResponseDto("NULL", "회원 정보가 없습니다.");
            ResponseSuccessDto<IsMemberResponseDto> res = responseUtil.successResponse(isMemberResponseDto, HereStatus.HERE_NOT_SUCCESS_FIND_MEMBER);
            return res;
        }
        System.out.println("여기여기" + byWalletAddress);
        IsMemberResponseDto isMemberResponseDto = new IsMemberResponseDto(byWalletAddress.get().getRole().toString(), "등록된 회원입니다.");
        ResponseSuccessDto<IsMemberResponseDto> res = responseUtil.successResponse(isMemberResponseDto, HereStatus.HERE_SUCCESS_FIND_MEMBER);
        return res;
    }

    // 회원가입시 이메일 중복 이중 체크 용 메소드
    public Boolean isEmailDuplicate(String email) {
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

        boolean isLevelUp = false;
        if (curExp >= goalExp) {
            goalExp += 50;
            level += 1;
            isLevelUp = true;
        }

        member.updateMemberExp(curExp, goalExp, level);

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


}
