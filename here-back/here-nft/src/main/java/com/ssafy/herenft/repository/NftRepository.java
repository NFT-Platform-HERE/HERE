package com.ssafy.herenft.repository;

import com.ssafy.herenft.entity.Nft;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NftRepository extends JpaRepository<Nft, String> {
}
