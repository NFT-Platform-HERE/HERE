package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class FindDonationRequestDto {
    private UUID senderId;
    private int quantity;
}
