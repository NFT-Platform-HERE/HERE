package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
@Builder
public class DonateNftRequestDto {
    private Long boardId;
    private UUID senderId;
    private UUID receiverId;
    private List<Long> nftTokenList;
}
