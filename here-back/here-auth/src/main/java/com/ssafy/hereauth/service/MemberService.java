package com.ssafy.hereauth.service;

import com.ssafy.hereauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereauth.dto.member.*;
import com.ssafy.hereauth.entity.*;
import com.ssafy.hereauth.entity.Character;
import com.ssafy.hereauth.enumeration.EnumCharacterType;
import com.ssafy.hereauth.enumeration.EnumMemberRole;
import com.ssafy.hereauth.enumeration.response.HereStatus;
import com.ssafy.hereauth.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.hereauth.errorhandling.exception.service.NotAppropriateValueException;
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
    private final BdHistoryRepository bdHistoryRepository;

    /**
     * 회원가입
     */
    public ResponseSuccessDto<SignupResponseDto> signup(SignupRequestDto signupRequestDto) {

        /**
         * email 중복 체크
         */
        if (isEmailDuplicate(signupRequestDto.getEmail())) {
            throw new NotAppropriateValueException("중복된 이메일은 사용할 수 없습니다.");
        }
        /**
         * nickname 중복 체크
         */
        if (isNicknameDuplicate(signupRequestDto.getNickname())) {
            throw new NotAppropriateValueException("중복된 닉네임은 사용할 수 없습니다.");
        }
        /**
         * 회원 저장
         */
        Character character = characterRepository.findById(signupRequestDto.getCharacterId()).orElseThrow(() -> new EntityIsNullException("없는 캐릭터입니다."));

        Member member = new Member();
        member.createMember(character, signupRequestDto);
        memberRepository.save(member);

        // 스탬프
        Stamp stamp = new Stamp();
        stamp.createStamp(member);
        stampRepository.save(stamp);

        SignupResponseDto signupResponseDto = SignupResponseDto.builder()
                .memberId(member.getId())
                .nickname(member.getNickname())
                .characterImgUrl(member.getCharacter().getImgUrl())
                .message("회원가입이 완료되었습니다.")
                .build();

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
        EnumCharacterType characterType = member.getCharacter().getType();

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

        MemberProfileResponseDto memberProfileResponseDto = MemberProfileResponseDto.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .characterImgUrl(characterImgUrl)
                .characterType(characterType)
                .level(member.getLevel())
                .bdCnt(bdHistoryCnt)
                .createdDate(member.getCreatedDate())
                .recentBdDate(recentBdDate)
                .nextWholeBdDays(nextWholeBdDays)
                .nextNotWholeBdDays(nextNotWholeBdDays)
                .build();

        ResponseSuccessDto<MemberProfileResponseDto> res = responseUtil.successResponse(memberProfileResponseDto, HereStatus.HERE_SUCCESS_FIND_MEMBER);
        return res;
    }

    /**
     * 이메일로 멤버 정보 조회
     */
    public ResponseSuccessDto<MemberInfoResponseDto> getMemberInfo(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 이메일입니다."));

        MemberInfoResponseDto memberInfoResponseDto = MemberInfoResponseDto.builder()
                .memberId(member.getId())
                .walletAddress(member.getWalletAddress())
                .build();

        ResponseSuccessDto<MemberInfoResponseDto> res = responseUtil.successResponse(memberInfoResponseDto, HereStatus.HERE_SUCCESS_FIND_MEMBER);
        return res;
    }

    // email 중복 체크
    public ResponseSuccessDto<ValidateEmailResponseDto> checkEmailDuplicate(String email) {
        Boolean isEmailDuplicate = memberRepository.existsByEmail(email);

        if (isEmailDuplicate) {
            ValidateEmailResponseDto validateEmailResponseDto = ValidateEmailResponseDto.builder()
                    .message("이미 사용 중인 이메일입니다.")
                    .build();
            ResponseSuccessDto<ValidateEmailResponseDto> res = responseUtil.successResponse(validateEmailResponseDto, HereStatus.HERE_DUPLICATED_EMAIL);
            return res;

        } else {
            ValidateEmailResponseDto validateEmailResponseDto = ValidateEmailResponseDto.builder()
                    .message("사용 가능한 이메일입니다.")
                    .build();
            ResponseSuccessDto<ValidateEmailResponseDto> res = responseUtil.successResponse(validateEmailResponseDto, HereStatus.HERE_NOT_DUPLICATED_EMAIL);
            return res;
        }
    }

    // nickname 중복 체크(수정)
    public ResponseSuccessDto<ValidateNicknameResponseDto> checkNicknameDuplicate(String nickname) {
        Boolean isNicknameDuplicate = memberRepository.existsByNickname(nickname);

        if (isNicknameDuplicate) {
            ValidateNicknameResponseDto validateNicknameResponseDto = ValidateNicknameResponseDto.builder()
                    .message("이미 사용 중인 닉네임입니다.")
                    .build();
            ResponseSuccessDto<ValidateNicknameResponseDto> res = responseUtil.successResponse(validateNicknameResponseDto, HereStatus.HERE_DUPLICATED_NICKNAME);
            return res;
        } else {
            ValidateNicknameResponseDto validateNicknameResponseDto = ValidateNicknameResponseDto.builder()
                    .message("사용 가능한 닉네임입니다.")
                    .build();
            ResponseSuccessDto<ValidateNicknameResponseDto> res = responseUtil.successResponse(validateNicknameResponseDto, HereStatus.HERE_NOT_DUPLICATED_NICKNAME);
            return res;
        }
    }

    // 회원가입 여부 확인
    public ResponseSuccessDto<IsMemberResponseDto> checkIsMember(String walletAddress) {

        Optional<Member> byWalletAddress = memberRepository.findByWalletAddress(walletAddress);
        Boolean isMember = memberRepository.existsByWalletAddress(walletAddress);

        if (byWalletAddress.isEmpty()) {
            IsMemberResponseDto isMemberResponseDto = IsMemberResponseDto.builder()
                    .role(null)
                    .memberId(null)
                    .nickname(null)
                    .characterImgUrl(null)
                    .message("등록되지 않은 회원입니다.")
                    .build();
            ResponseSuccessDto<IsMemberResponseDto> res = responseUtil.successResponse(isMemberResponseDto, HereStatus.HERE_NOT_SUCCESS_FIND_MEMBER);
            return res;
        }
        Member member = byWalletAddress.get();
        IsMemberResponseDto isMemberResponseDto = IsMemberResponseDto.builder()
                .role(member.getRole())
                .memberId(member.getId())
                .nickname(member.getNickname())
                .characterImgUrl(member.getCharacter().getImgUrl())
                .message("등록된 회원입니다.")
                .build();
        ResponseSuccessDto<IsMemberResponseDto> res = responseUtil.successResponse(isMemberResponseDto, HereStatus.HERE_SUCCESS_FIND_MEMBER);
        return res;
    }

    // 회원가입시 이메일 중복 이중 체크 용 메소드
    public boolean isEmailDuplicate(String email) {
        return memberRepository.existsByEmail(email);
    }
    // 회원가입시 닉네임 중복 이중 체크 용 메소드
    public boolean isNicknameDuplicate(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    /**
     * 경험치 상승
     */
    public ResponseSuccessDto<ExpUpdateResponseDto> updateExp(ExpUpdateRequestDto expUpdateRequestDto) {
        Member member = memberRepository.findById(expUpdateRequestDto.getMemberId())
                .orElseThrow(() -> new EntityIsNullException("올바르지 않은 멤버ID입니다."));

        int curExp = member.getCurExp() + expUpdateRequestDto.getExp();
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

        ExpUpdateResponseDto expUpdateResponseDto = ExpUpdateResponseDto.builder()
                .level(level)
                .message("경험치가 상승하였습니다.")
                .build();
        ResponseSuccessDto<ExpUpdateResponseDto> res = responseUtil.successResponse(expUpdateResponseDto, isLevelUp? HereStatus.HERE_UPDATE_LEVEL : HereStatus.HERE_UPDATE_EXP);
        return res;
    }

    /**
     * 스탬프 정보 조회
     */
    public ResponseSuccessDto<StampGetResponseDto> getStampInfo(UUID memberId) {

        Stamp stampInfo = stampRepository.findByMemberId(memberId);

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
