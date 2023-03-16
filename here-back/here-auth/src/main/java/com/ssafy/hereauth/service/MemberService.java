package com.ssafy.hereauth.service;

import com.ssafy.hereauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereauth.dto.member.SignupRequestDto;
import com.ssafy.hereauth.dto.member.SignupResponseDto;
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
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;

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
        SignupResponseDto signupResponseDto = new SignupResponseDto("회원가입이 성공적으로 완료되었습니다.");
        ResponseSuccessDto<SignupResponseDto> res = responseUtil.successResponse(signupResponseDto);
        return res;
    }

    public ResponseSuccessDto<Boolean> checkEmailDuplicate(String email) {
        Boolean isEmailDuplicated = memberRepository.existsByEmail(email);
        System.out.println("이메일 중복됨" + email + isEmailDuplicated);
        return responseUtil.successResponse(isEmailDuplicated);
    }

    // 회원가입시 이메일 중복 이중 체크 용 메소드
    public Boolean isEmailDuplicate(String email) {
        return memberRepository.existsByEmail(email);
    }
}