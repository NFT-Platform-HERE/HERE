package com.ssafy.hereauth.service;

import com.ssafy.hereauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereauth.dto.member.*;
import com.ssafy.hereauth.entity.Character;
import com.ssafy.hereauth.entity.Member;
import com.ssafy.hereauth.entity.MemberCharacter;
import com.ssafy.hereauth.entity.Stamp;
import com.ssafy.hereauth.repository.CharacterRepository;
import com.ssafy.hereauth.repository.MemberCharacterRepository;
import com.ssafy.hereauth.repository.MemberRepository;
import com.ssafy.hereauth.repository.StampRepository;
import com.ssafy.hereauth.util.ResponseUtil;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.expression.spel.ast.NullLiteral;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.util.Optional;

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

    // 회원가입
    public ResponseSuccessDto<SignupResponseDto> signup(@RequestBody SignupRequestDto signupRequestDto) {

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
        Character character = characterRepository.findById(signupRequestDto.getCharacterId()).orElseThrow(() -> new RuntimeException("없는 캐릭터입니다."));
        memberCharacter.createMemberCharacter(member, character, signupRequestDto.getCharacterName());
        memberCharacterRepository.save(memberCharacter);

        // 스탬프
        Stamp stamp = new Stamp();
        stamp.createStamp(member);
        stampRepository.save(stamp);

        // 리턴
        SignupResponseDto signupResponseDto = new SignupResponseDto("회원가입이 완료되었습니다.");
        ResponseSuccessDto<SignupResponseDto> res = responseUtil.successResponse(signupResponseDto);
        return res;
    }

    // email 중복 체크
//    public ResponseSuccessDto<ValidateEmailResponseDto> checkEmailDuplicate(String email) {
//        Boolean isEmailDuplicate = memberRepository.existsByEmail(email);
//        System.out.println("이메일 중복됨" + email + isEmailDuplicate);
//
//        Optional<Member> byEmail = memberRepository.findByEmail(email);
//        Boolean isMember = memberRepository.existsByWalletAddress(walletAddress);
//        System.out.println("존재하는 지갑주소 정보임" + walletAddress + isMember);
//
//        if (byWalletAddress.isEmpty()) {
//            System.out.println("여기여기" + byWalletAddress);
//            IsMemberResponseDto isMemberResponseDto = new IsMemberResponseDto("NULL", "회원 정보가 없습니다.");
//            ResponseSuccessDto<IsMemberResponseDto> res = responseUtil.successResponse(isMemberResponseDto);
//            return res;
////        } else {
////            System.out.println("여기여기" + byWalletAddress);
////            IsMemberResponseDto isMemberResponseDto = new IsMemberResponseDto(byWalletAddress.getRole(), "회원 정보가 없습니다");
//
//        }
//        System.out.println("여기여기" + byWalletAddress);
//        IsMemberResponseDto isMemberResponseDto = new IsMemberResponseDto(byWalletAddress.get().getRole().toString(), "등록된 회원입니다.");
//        ResponseSuccessDto<IsMemberResponseDto> res = responseUtil.successResponse(isMemberResponseDto);
//        return res;
//        if (isEmailDuplicate) {
//            ValidateEmailResponseDto validateEmailResponseDto = new ValidateEmailResponseDto("이미 사용중인 이메일입니다.");
//        } else {
//            ValidateEmailResponseDto validateEmailResponseDto = new ValidateEmailResponseDto("사용 가능한 이메일입니다.");
//        }
//
//        ResponseSuccessDto<ValidateEmailResponseDto> res = responseUtil.successResponse(validateEmailResponseDto);
//        return res;
//    }

    // nickname 중복 체크(초기)
//    public ResponseSuccessDto<Boolean> checkNicknameDuplicated(String nickname) {
//        Boolean isNicknameDuplicated = memberRepository.existsByNickname(nickname);
//        System.out.println("이메일 중복됨" + nickname + isNicknameDuplicated);
//        ResponseSuccessDto<Boolean> res = responseUtil.successResponse(isNicknameDuplicated);
//        return res;
//    }
    // nickname 중복 체크(수정)
    public ResponseSuccessDto<ValidateNicknameResponseDto> checkNicknameDuplicated(String nickname) {
        Boolean isNicknameDuplicated = memberRepository.existsByNickname(nickname);
        System.out.println("이메일 중복됨" + nickname + isNicknameDuplicated);
        if (isNicknameDuplicated) {
            ValidateNicknameResponseDto validateNicknameResponseDto = new ValidateNicknameResponseDto("이미 사용중인 닉네임입니다.");
            ResponseSuccessDto<ValidateNicknameResponseDto> res = responseUtil.successResponse(validateNicknameResponseDto);
            return res;
        } else {
            ValidateNicknameResponseDto validateNicknameResponseDto = new ValidateNicknameResponseDto("사용 가능한 닉네임입니다.");
            ResponseSuccessDto<ValidateNicknameResponseDto> res = responseUtil.successResponse(validateNicknameResponseDto);
            return res;
        }

    }

    // 존재하는 회원인지 체크
    public ResponseSuccessDto<IsMemberResponseDto> checkIsMember(String walletAddress) {
        Optional<Member> byWalletAddress = memberRepository.findByWalletAddress(walletAddress);
        Boolean isMember = memberRepository.existsByWalletAddress(walletAddress);
        System.out.println("존재하는 지갑주소 정보임" + walletAddress + isMember);

        if (byWalletAddress.isEmpty()) {
            System.out.println("여기여기" + byWalletAddress);
            IsMemberResponseDto isMemberResponseDto = new IsMemberResponseDto("NULL", "회원 정보가 없습니다.");
            ResponseSuccessDto<IsMemberResponseDto> res = responseUtil.successResponse(isMemberResponseDto);
            return res;
        }
        System.out.println("여기여기" + byWalletAddress);
        IsMemberResponseDto isMemberResponseDto = new IsMemberResponseDto(byWalletAddress.get().getRole().toString(), "등록된 회원입니다.");
        ResponseSuccessDto<IsMemberResponseDto> res = responseUtil.successResponse(isMemberResponseDto);
        return res;
    }

    // 회원가입시 이메일 중복 이중 체크 용 메소드
    public Boolean isEmailDuplicate(String email) {
        return memberRepository.existsByEmail(email);
    }
}
