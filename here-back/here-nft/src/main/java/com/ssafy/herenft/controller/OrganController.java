package com.ssafy.herenft.controller;

import com.ssafy.herenft.dto.common.response.ResponseSuccessDto;
import com.ssafy.herenft.dto.nft.SubmitCertHospitalRequestDto;
import com.ssafy.herenft.dto.nft.SubmitCertHospitalResponseDto;
import com.ssafy.herenft.dto.organ.GetCertAgencyResponseDto;
import com.ssafy.herenft.dto.organ.GetCertHospitalResponseDto;
import com.ssafy.herenft.dto.organ.GetNftRedcrossResponseDto;
import com.ssafy.herenft.eunmeration.EnumCertHistoryStatus;
import com.ssafy.herenft.service.OrganService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Api("조직 컨트롤러 V1")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/organ")
public class OrganController {

    private final OrganService organService;

    @ApiOperation(value = "증명 승인/미승인 목록 조회(기관)", notes = "기관이 증명 승인/미승인 목록을 조회합니다.")
    @GetMapping("/agency/{agencyId}/{status}")
    public ResponseEntity<ResponseSuccessDto<List<GetCertAgencyResponseDto>>> getCertAgency(@PathVariable("agencyId") UUID agencyId, @PathVariable("status") EnumCertHistoryStatus status) {
        return ResponseEntity.ok(organService.getCertAgency(agencyId, status));
    }

    @ApiOperation(value = "증명 승인/미승인 목록 조회(병원)", notes = "병원이 증명 승인/미승인 목록을 조회합니다.")
    @GetMapping("/hospital/{hospitalId}/{status}")
    public ResponseEntity<ResponseSuccessDto<List<GetCertHospitalResponseDto>>> getCertHospital(@PathVariable("hospitalId") UUID hospitalId, @PathVariable("status") EnumCertHistoryStatus status) {
        return ResponseEntity.ok(organService.getCertHospital(hospitalId, status));
    }

    @ApiOperation(value = "NFT 발행 목록 조회 (적십자)", notes = "적십자가 발행한 NFT 목록을 조회합니다.")
    @GetMapping("/redcross")
    public ResponseEntity<ResponseSuccessDto<List<GetNftRedcrossResponseDto>>> getNftRedCross() {
        return ResponseEntity.ok(organService.getNftRedcross());
    }
}
