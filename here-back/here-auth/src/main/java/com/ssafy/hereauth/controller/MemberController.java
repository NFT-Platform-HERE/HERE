package com.ssafy.hereauth.controller;

import com.ssafy.hereauth.dto.common.response.ResponseSuccessDto;
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

    @ApiOperation(value = "이메일 중복 검사", notes = "이메일 중복 검사를 한다.")
    @GetMapping("/check/email/{email}")
    public ResponseEntity<ResponseSuccessDto<Boolean>> checkEmailDuplicate(@PathVariable String email) {
        return ResponseEntity.ok(memberService.checkEmailDuplicate(email));
    }
}
