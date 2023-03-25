package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class TransferOwnershipRequestDto {
    private UUID senderId;
    private UUID receiverId;
    private int quantity;
}
