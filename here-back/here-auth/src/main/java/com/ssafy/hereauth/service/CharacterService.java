package com.ssafy.hereauth.service;

import com.ssafy.hereauth.dto.character.CharacterStartingResponseDto;
import com.ssafy.hereauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereauth.entity.Character;
import com.ssafy.hereauth.enumeration.response.HereStatus;
import com.ssafy.hereauth.repository.CharacterRepository;
import com.ssafy.hereauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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

    // 스타팅 캐릭터 조회
    public ResponseSuccessDto<List<CharacterStartingResponseDto>> findCharacters() {
        List<Character> characters = characterRepository.findAllByLevel(1);
        List<CharacterStartingResponseDto> result = characters.stream()
                .map(c -> CharacterStartingResponseDto.builder()
                        .characterId(c.getId()).characterImgUrl(c.getImgUrl()).build())
                .collect(Collectors.toList());
        ResponseSuccessDto<List<CharacterStartingResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_SUCCESS_FIND_CHARACTER);
        return res;
    }
}
