package com.ssafy.herenft.controller;

import com.ssafy.herenft.dto.common.response.ResponseSuccessDto;
import com.ssafy.herenft.dto.nft.*;
import com.ssafy.herenft.eunmeration.EnumNftType;
import com.ssafy.herenft.service.NftService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@Api("제출해요 컨트롤러 V1")
@RestController
@RequiredArgsConstructor
@Slf4j
@Validated
@RequestMapping("/nft")
public class NftController {

    private final NftService nftService;

    @ApiOperation(value = "nft 등록", notes = "nft를 등록합니다.")
    @PostMapping("")
    public ResponseEntity<ResponseSuccessDto<SaveNftResponseDto>> save(@RequestBody @Valid SaveNftRequestDto saveNftRequestDto) {
        return ResponseEntity.ok(nftService.save(saveNftRequestDto));
    }

    @ApiOperation(value = "my nft 목록 조회", notes = "나의 NFT 목록을 조회합니다.")
    @GetMapping("/{memberId}")
    public ResponseEntity<ResponseSuccessDto<List<GetNftResponseDto>>> getNftList(@PathVariable("memberId") UUID memberId) {
        return ResponseEntity.ok(nftService.getNftList(memberId));
    }

    @ApiOperation(value = "내 증명서 제출(기관)", notes = "기관에 나의 증명서를 제출합니다.")
    @PostMapping("/agency")
    public ResponseEntity<ResponseSuccessDto<SubmitCertAgencyResponseDto>> submitCertAgency(@RequestBody SubmitCertAgencyRequestDto submitCertAgencyRequestDto) {
        return ResponseEntity.ok(nftService.submitCertAgency(submitCertAgencyRequestDto));
    }

    @ApiOperation(value = "내 증명서 제출(병원)", notes = "병원에 나의 증명서를 제출합니다.")
    @PostMapping("/hospital")
    public ResponseEntity<ResponseSuccessDto<SubmitCertHospitalResponseDto>> submitCertHospital(@RequestBody SubmitCertHospitalRequestDto submitCertHospitalRequestDto) {
        return ResponseEntity.ok(nftService.submitCertHospital(submitCertHospitalRequestDto));
    }

    @ApiOperation(value = "기부 해시값 개수 조회", notes = "병원에 나의 증명서를 제출합니다.")
    @GetMapping("/count/{senderId}")
    public ResponseEntity<ResponseSuccessDto<GetDonateNftCntResponseDto>> getDonateNftCnt(@PathVariable("senderId") UUID senderId) {
        return ResponseEntity.ok(nftService.getDonateNftCnt(senderId));
    }

    @ApiOperation(value = "기부 헌혈증 소유권 이전", notes = "기부한 헌혈증애 대한 소유권 이전을 합니다.")
    @PatchMapping("/donate")
    public ResponseEntity<ResponseSuccessDto<TransferOwnershipResponseDto>> transferNftOwnership(
            @RequestBody TransferOwnershipRequestDto transferOwnershipRequestDto) {
        return ResponseEntity.ok(nftService.transferNftOwnership(transferOwnershipRequestDto));
    }

    @ApiOperation(value = "기관용/병원용 NFT 목록 조회", notes = "제출해요 페이지에서 인증/제출할 NFT 목록을 조회합니다.")
    @GetMapping("/{memberId}/{organType}")
    public ResponseEntity<ResponseSuccessDto<List<?>>> getNftToOrgan(@PathVariable("memberId") UUID memberId, @PathVariable("organType") EnumNftType organType) {
        return ResponseEntity.ok(nftService.getNftToOrgan(memberId, organType));
    }

    @ApiOperation(value = "기부/병원 제출용 자동선택 NFT 목록 조회", notes = "기부 또는 병원 제출용으로 자동선택된 NFT 목록을 조회합니다.")
    @GetMapping("/{memberId}/hospital/{count}")
    public ResponseEntity<ResponseSuccessDto<List<FindHospitalNftResponseDto>>> findHospitalNftAuto(
            @PathVariable("memberId") UUID memberId, @PathVariable("count") int count) {
        return ResponseEntity.ok(nftService.findHospitalNftList(memberId, count));
    }
}
