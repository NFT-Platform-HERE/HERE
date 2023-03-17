package com.ssafy.hereauth.service;

import com.ssafy.hereauth.dto.character.CharacterRequestDto;
import com.ssafy.hereauth.dto.character.CharacterResponseDto;
import com.ssafy.hereauth.dto.character.CharacterStartingResponseDto;
import com.ssafy.hereauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereauth.entity.Character;
import com.ssafy.hereauth.repository.CharacterRepository;
import com.ssafy.hereauth.util.ResponseUtil;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class CharacterService {

    private final ResponseUtil responseUtil;
    private final CharacterRepository characterRepository;

    // 캐릭터 임의 생성
    public ResponseSuccessDto<CharacterResponseDto> postCharacter(@RequestBody CharacterRequestDto characterRequestDto) {
        Character character = new Character();
        character.createCharacter(characterRequestDto);
        characterRepository.save(character);

        CharacterResponseDto characterResponseDto = new CharacterResponseDto("캐릭터가 생성되었습니다.");
        ResponseSuccessDto<CharacterResponseDto> res = responseUtil.successResponse(characterResponseDto);
        return res;
    }


    public ResponseSuccessDto<List<CharacterStartingResponseDto>> findCharacters() {
        List<Character> characters = characterRepository.findCharacterStarting(0);
        List<CharacterStartingResponseDto> result = characters.stream()
                .map(c -> new CharacterStartingResponseDto(c))
                .collect(Collectors.toList());
        ResponseSuccessDto<List<CharacterStartingResponseDto>> res = responseUtil.successResponse(result);
        return res;
    }
}
