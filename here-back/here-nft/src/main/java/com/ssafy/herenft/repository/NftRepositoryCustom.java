package com.ssafy.herenft.repository;

import com.ssafy.herenft.dto.nft.FindDonationResponseDto;
import com.ssafy.herenft.dto.nft.FindHospitalNftResponseDto;
import com.ssafy.herenft.entity.Member;
import com.ssafy.herenft.entity.Nft;

import java.util.List;
import java.util.UUID;

public interface NftRepositoryCustom {
    List<Nft> findHospitalNftAuto(UUID memberId, int count);
    List<FindDonationResponseDto> findDonationList(UUID memberId, int count);
}
