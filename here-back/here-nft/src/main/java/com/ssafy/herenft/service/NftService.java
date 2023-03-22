package com.ssafy.herenft.service;

import com.ssafy.herenft.dto.common.response.ResponseSuccessDto;
import com.ssafy.herenft.dto.nft.SaveNftRequestDto;
import com.ssafy.herenft.dto.nft.SaveNftResponseDto;
import com.ssafy.herenft.entity.Nft;
import com.ssafy.herenft.eunmeration.response.HereStatus;
import com.ssafy.herenft.repository.NftRepository;
import com.ssafy.herenft.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class NftService {

    private final ResponseUtil responseUtil;
    private final NftRepository nftRepository;

    /* NFT 생성 */
    public ResponseSuccessDto<SaveNftResponseDto> save(SaveNftRequestDto saveNftRequestDto) {
        System.out.println("서비스단 들어옴" + saveNftRequestDto);
        Nft nft = new Nft().createNft(saveNftRequestDto);
        nftRepository.save(nft);

        SaveNftResponseDto saveNftResponseDto = SaveNftResponseDto.builder()
                .message("NFT 등록 성공")
                .build();

        ResponseSuccessDto<SaveNftResponseDto> res = responseUtil.successResponse(saveNftResponseDto, HereStatus.HERE_CREATE_NFT);
        return res;
    }
}
