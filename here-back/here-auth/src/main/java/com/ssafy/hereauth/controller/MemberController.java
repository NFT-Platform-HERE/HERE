package com.ssafy.hereauth.controller;

import com.ssafy.hereauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereauth.dto.member.IsMemberResponseDto;
import com.ssafy.hereauth.dto.member.SignupRequestDto;
import com.ssafy.hereauth.dto.member.SignupResponseDto;
import com.ssafy.hereauth.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("Member Controller v1")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    /* 회원가입 */
    @ApiOperation(value = "회원가입", notes = "회원가입을 한다.")
    @PostMapping("/signup")
    public ResponseEntity<ResponseSuccessDto<SignupResponseDto>> signup(SignupRequestDto signupRequestDto) {
        return ResponseEntity.ok(memberService.signup(signupRequestDto));
    }

    /* 중복 이메일 검사 */
    @ApiOperation(value = "이메일 중복 검사", notes = "이메일 중복 검사를 한다.")
    @GetMapping("/check/email/{email}")
    public ResponseEntity<ResponseSuccessDto<Boolean>> checkEmailDuplicate(@PathVariable String email) {
        return ResponseEntity.ok(memberService.checkEmailDuplicate(email));
    }

    /* 중복 닉네임 검사 */
    @ApiOperation(value = "닉네임 중복 검사", notes = "닉네임 중복 검사를 한다.")
    @GetMapping("/check/nickname/{nickname}")
    public ResponseEntity<ResponseSuccessDto<Boolean>> checkNicknameDuplicate(@PathVariable String nickname) {
        return ResponseEntity.ok(memberService.checkNicknameDuplicate(nickname));
    }

    /* 회원가입 여부 확인 */
    @ApiOperation(value = "회원가입 여부 확인", notes = "존재하는 회원 정보인지 조회한다.")
    @GetMapping("/find/{walletAddress}")
    public ResponseEntity<ResponseSuccessDto<IsMemberResponseDto>> checkIsMember(@PathVariable String walletAddress) {
        return ResponseEntity.ok(memberService.checkIsMember(walletAddress));
    }
}
