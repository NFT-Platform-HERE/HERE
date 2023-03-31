package com.ssafy.herenft.repository;

import com.ssafy.herenft.entity.Nft;
import com.ssafy.herenft.eunmeration.EnumNftType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface NftRepository extends JpaRepository<Nft, Long>, NftRepositoryCustom {
    List<Nft> findAllByIssuerIdAndType(UUID memberId, EnumNftType agency);

    List<Nft> findAllByOwnerIdAndType(UUID memberId, EnumNftType hospital);

    Nft findByTokenId(Long nftToken);
}
