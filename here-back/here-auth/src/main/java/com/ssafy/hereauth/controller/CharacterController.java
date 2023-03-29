package com.ssafy.hereauth.controller;

import com.ssafy.hereauth.dto.character.CharacterRequestDto;
import com.ssafy.hereauth.dto.character.CharacterResponseDto;
import com.ssafy.hereauth.dto.character.CharacterStartingResponseDto;
import com.ssafy.hereauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereauth.repository.CharacterRepository;
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

//    /* 캐릭터 임의 생성 */
//    @ApiOperation(value = "캐릭터 생성", notes = "캐릭터를 생성한다.")
//    @PostMapping
//    private ResponseEntity<ResponseSuccessDto<CharacterResponseDto>> postCharacter(@RequestBody CharacterRequestDto characterRequestDto) {
//        return ResponseEntity.ok(characterService.postCharacter(characterRequestDto));
//    }

    // 스타팅 캐릭터 조회
    @ApiOperation(value = "스타팅 캐릭터 조회", notes = "스타팅 캐릭터를 조회한다.")
    @GetMapping
    private ResponseEntity<ResponseSuccessDto<List<CharacterStartingResponseDto>>> findCharacterList() {
        return ResponseEntity.ok(characterService.findCharacters());
    }
}
