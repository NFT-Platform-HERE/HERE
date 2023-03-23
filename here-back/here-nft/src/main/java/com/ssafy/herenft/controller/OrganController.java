package com.ssafy.herenft.controller;

import com.ssafy.herenft.dto.common.response.ResponseSuccessDto;
import com.ssafy.herenft.dto.nft.SubmitCertHospitalRequestDto;
import com.ssafy.herenft.dto.nft.SubmitCertHospitalResponseDto;
import com.ssafy.herenft.dto.organ.GetCertAgencyResponseDto;
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
    @GetMapping("/{agencyId}/{status}")
    public ResponseEntity<ResponseSuccessDto<List<GetCertAgencyResponseDto>>> getCertAgency(@PathVariable("agencyId") UUID agencyId, @PathVariable("status") EnumCertHistoryStatus status) {
        System.out.println("컨트롤러 단");
        return ResponseEntity.ok(organService.getCertAgency(agencyId, status));
    }
}
