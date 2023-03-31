package com.ssafy.herenft.repository;

import com.ssafy.herenft.entity.Nft;
import com.ssafy.herenft.eunmeration.EnumNftType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NftRepository extends JpaRepository<Nft, Long>, NftRepositoryCustom {
    List<Nft> findAllByIssuerIdAndType(UUID memberId, EnumNftType agency);

    List<Nft> findAllByOwnerIdAndType(UUID memberId, EnumNftType hospital);

    Nft findByTokenId(Long nftToken);

//    Optional<Nft> findTop1ByIssuerIdAndCreatedDateBetween(UUID issuerId, LocalDateTime yesterday, LocalDateTime tomorrow);
}
