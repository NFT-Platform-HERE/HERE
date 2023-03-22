package com.ssafy.herenft.service;

import com.ssafy.herenft.dto.common.response.ResponseSuccessDto;
import com.ssafy.herenft.dto.nft.GetNftResponseDto;
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

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
        nftRepository.flush();

        System.out.println("!!!!");
        System.out.println(nft.getId());
        System.out.println("시간" + nft.getCreatedDate());

        SaveNftResponseDto saveNftResponseDto = SaveNftResponseDto.builder()
                .message("NFT 등록 성공")
                .build();

        ResponseSuccessDto<SaveNftResponseDto> res = responseUtil.successResponse(saveNftResponseDto, HereStatus.HERE_CREATE_NFT);
        return res;
    }

    /* NFT 목록 조회 */
    public ResponseSuccessDto<List<GetNftResponseDto>> getNftList(UUID memberId) {
        List<Nft> myNftList = nftRepository.findAllByIssuerId(memberId);

        List<GetNftResponseDto> result = new ArrayList<>();

        for (Nft myNft : myNftList) {
            GetNftResponseDto getNftResponseDto = GetNftResponseDto.builder()
                    .nftId(myNft.getId())
                    .imgUrl(myNft.getImgUrl())
                    .build();
            result.add(getNftResponseDto);
        }

        ResponseSuccessDto<List<GetNftResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_NFT_LIST);
        return res;
    }


}
