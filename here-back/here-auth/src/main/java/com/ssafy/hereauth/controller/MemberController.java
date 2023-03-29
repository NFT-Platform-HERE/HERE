package com.ssafy.hereauth.controller;

import com.ssafy.hereauth.dto.bdHistory.BdHistoryCreateRequestDto;
import com.ssafy.hereauth.dto.bdHistory.BdHistoryCreateResponseDto;
import com.ssafy.hereauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereauth.dto.member.*;
import com.ssafy.hereauth.enumeration.EnumMemberRole;
import com.ssafy.hereauth.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import java.util.List;
import java.util.UUID;

@Api("Member Controller v1")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/member")
@Validated
public class MemberController {

    private final MemberService memberService;

    /* 회원가입 */
    @ApiOperation(value = "회원가입", notes = "회원가입을 한다.")
    @PostMapping("/signup")
    public ResponseEntity<ResponseSuccessDto<SignupResponseDto>> signup(@RequestBody @Valid SignupRequestDto signupRequestDto) {
        System.out.println("컨트롤러" + signupRequestDto);
        System.out.println(signupRequestDto.getCharacterId());
        System.out.println(signupRequestDto.getWalletAddress());
        System.out.println("----------");
        return ResponseEntity.ok(memberService.signup(signupRequestDto));
    }

    /* 중복 이메일 검사 */
    @ApiOperation(value = "이메일 중복 검사", notes = "이메일 중복 검사를 한다.")
    @GetMapping("/check/email/{email:.+}")
    public ResponseEntity<ResponseSuccessDto<ValidateEmailResponseDto>> checkEmailDuplicate(@PathVariable @Email(message = "이메일 형식을 지켜주세요!") String email) {
        return ResponseEntity.ok(memberService.checkEmailDuplicate(email));
    }

    /* 중복 닉네임 검사 */
    @ApiOperation(value = "닉네임 중복 검사", notes = "닉네임 중복 검사를 한다.")
    @GetMapping("/check/nickname/{nickname}")
    public ResponseEntity<ResponseSuccessDto<ValidateNicknameResponseDto>> checkNicknameDuplicate(@PathVariable String nickname) {
        return ResponseEntity.ok(memberService.checkNicknameDuplicate(nickname));
    }

    /* 회원가입 여부 확인 */
    @ApiOperation(value = "회원가입 여부 확인", notes = "존재하는 회원 정보인지 조회한다.")
    @GetMapping("/find/{walletAddress}")
    public ResponseEntity<ResponseSuccessDto<IsMemberResponseDto>> checkIsMember(@PathVariable String walletAddress) {
        return ResponseEntity.ok(memberService.checkIsMember(walletAddress));
    }

    /* 멤버 명함 조회 */
    @ApiOperation(value = "멤버 명함 조회", notes = "회원의 기본 정보를 조회한다.")
    @GetMapping("/{memberId}")
    public ResponseEntity<ResponseSuccessDto<MemberProfileResponseDto>> getProfile(@PathVariable("memberId") UUID memberId) {
        return ResponseEntity.ok(memberService.getProfile(memberId));
    }

    /* 이메일로 회원 조회 */
    @ApiOperation(value = "이메일로 회원 조회", notes = "이메일로 회원 정보를 조회한다.")
    @GetMapping("/search/{email:.+}")
    public ResponseEntity<ResponseSuccessDto<MemberInfoResponseDto>> getMemberInfo(@PathVariable @Email(message = "이메일 형식을 지켜주세요!") String email) {
        return ResponseEntity.ok(memberService.getMemberInfo(email));
    }

    /* 경험치 상승 */
    @ApiOperation(value = "경험치 상승", notes = "회원 경험치를 갱신한다.")
    @PatchMapping("/update/exp")
    public ResponseEntity<ResponseSuccessDto<ExpUpdateResponseDto>> updateExp(@RequestBody ExpUpdateRequestDto expUpdateRequestDto) {
        return ResponseEntity.ok(memberService.updateExp(expUpdateRequestDto));
    }

//    /* CertHistory 생성 */
//    @ApiOperation(value = "제출 기록 생성", notes = "헌혈증 증명 제출 기록을 생성한다.")
//    @PostMapping("/nft/agency")
//    public ResponseEntity<ResponseSuccessDto<CertHistoryCreateResponseDto>> createCertHistory(@RequestBody CertHistoryCreateRequestDto certHistoryCreateRequestDto) {
//        return ResponseEntity.ok(memberService.createCertHistory(certHistoryCreateRequestDto));
//    }
//
//    /* BdHistory 생성 */
//    @ApiOperation(value = "헌혈 기록 생성", notes = "헌혈증 발행 기록을 생성한다.")
//    @PostMapping("/nft/bd")
//    public ResponseEntity<ResponseSuccessDto<BdHistoryCreateResponseDto>> createBdHistory(@RequestBody BdHistoryCreateRequestDto bdHistoryCreateRequestDto) {
//        return ResponseEntity.ok(memberService.createBdHistory(bdHistoryCreateRequestDto));
//    }

    /* 스탬프 정보 조회 */
    @ApiOperation(value = "스탬프 정보 조회", notes = "스탬프 정보를 조회한다.")
    @GetMapping("/stamp/{memberId}")
    public ResponseEntity<ResponseSuccessDto<StampGetResponseDto>> getStamp(@PathVariable("memberId") UUID memberId) {
        return ResponseEntity.ok(memberService.getStampInfo(memberId));
    }

    /* 증명서 제출 기관/병원 검색 */
    @ApiOperation(value = "증명서 제출 기관/병원 검색", notes = "제출할 기관/병원을 검색한다.")
    @GetMapping("/search/organ/{organType}")
    public ResponseEntity<ResponseSuccessDto<List<OrganSearchResponseDto>>> searchOrgan(@PathVariable("organType") EnumMemberRole organType, @RequestParam("query") String query) {
        return ResponseEntity.ok(memberService.searchOrgan(organType, query));
    }
}
