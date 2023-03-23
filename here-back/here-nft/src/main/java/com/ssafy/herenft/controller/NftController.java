package com.ssafy.herenft.controller;

import com.ssafy.herenft.dto.common.response.ResponseSuccessDto;
import com.ssafy.herenft.dto.nft.*;
import com.ssafy.herenft.service.NftService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.tool.schema.internal.exec.ScriptTargetOutputToFile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Api("제출해요 컨트롤러 V1")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/nft")
public class NftController {

    private final NftService nftService;

    @ApiOperation(value = "nft 등록", notes = "nft를 등록합니다.")
    @PostMapping()
    public ResponseEntity<ResponseSuccessDto<SaveNftResponseDto>> save(@RequestBody SaveNftRequestDto saveNftRequestDto) {
        System.out.println("controller에 들어옴");
        System.out.println(saveNftRequestDto);
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
}
