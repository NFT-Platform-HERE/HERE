package com.ssafy.herenft.repository;

import com.ssafy.herenft.dto.nft.TransferOwnershipResponseDto;
import com.ssafy.herenft.entity.Nft;

import java.util.List;
import java.util.UUID;

public interface NftRepositoryCustom {
    List<Nft> findHospitalNftAuto(UUID memberId, int count);
    List<Nft> findDonationList(UUID memberId, int count);
}
