package com.ssafy.hereauth.controller;

import com.ssafy.hereauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereauth.dto.bdHistory.BdHistoryGetResponseDto;
import com.ssafy.hereauth.service.BdHistoryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@Api("BdHistory Controller v1")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/bd")
public class BdHistoryController {

    private final BdHistoryService bdHistoryService;

    /* 헌혈 기록 조회 */
    @ApiOperation(value = "헌혈 기록 조회", notes = "헌혈 기록을 조회한다.")
    @GetMapping("/history/{memberId}")
    private ResponseEntity<ResponseSuccessDto<List<BdHistoryGetResponseDto>>> getBdHistory(@PathVariable("memberId") UUID memberId) {
        return ResponseEntity.ok(bdHistoryService.getBdHistory(memberId));
    }
}
