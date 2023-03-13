package com.ssafy.hereauth.service;

import com.ssafy.hereauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereauth.dto.member.SignupRequestDto;
import com.ssafy.hereauth.repository.MemberRepository;
import com.ssafy.hereauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final ResponseUtil responseUtil;
    private final MemberRepository memberRepository;

    public ResponseSuccessDto<String> signup(SignupRequestDto signupRequestDto) {

        /**
         * email 중복 체크
         */

        /**
         * 회원 저장
         */


        return responseUtil.successResponse("회원가입 성공");
    }
}
