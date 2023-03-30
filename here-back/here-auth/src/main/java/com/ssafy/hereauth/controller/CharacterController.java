package com.ssafy.hereauth.controller;

import com.ssafy.hereauth.dto.character.GetStartingCharacterResponseDto;
import com.ssafy.hereauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereauth.service.CharacterService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api("Character Controller v1")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/character")
public class CharacterController {

    private final CharacterService characterService;

    /* 스타팅 캐릭터 조회 */
    @ApiOperation(value = "스타팅 캐릭터 조회", notes = "스타팅 캐릭터를 조회한다.")
    @GetMapping
    private ResponseEntity<ResponseSuccessDto<List<GetStartingCharacterResponseDto>>> findCharacterList() {
        return ResponseEntity.ok(characterService.findCharacters());
    }
}
