package com.ssafy.herenft.repository;

import com.ssafy.herenft.dto.nft.FindHospitalNftResponseDto;
import com.ssafy.herenft.entity.Member;

import java.util.List;
import java.util.UUID;

public interface NftRepositoryCustom {
    List<FindHospitalNftResponseDto> findHospitalNftAuto(Member member, int count);
}
