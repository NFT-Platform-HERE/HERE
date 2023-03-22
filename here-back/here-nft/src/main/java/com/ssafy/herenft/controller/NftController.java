package com.ssafy.herenft.controller;

import com.ssafy.herenft.dto.common.response.ResponseSuccessDto;
import com.ssafy.herenft.dto.nft.SaveNftRequestDto;
import com.ssafy.herenft.dto.nft.SaveNftResponseDto;
import com.ssafy.herenft.service.NftService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.tool.schema.internal.exec.ScriptTargetOutputToFile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
