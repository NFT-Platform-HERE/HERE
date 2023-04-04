package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
public class TransferOwnershipRequestDto {
    @NotNull(message = "송신자 멤버 ID는 필수 값입니다.")
    private UUID senderId;
    @NotNull(message = "수신자 멤버 ID는 필수 값입니다.")
    private UUID receiverId;
    @NotNull(message = "nft 토큰 목록은 필수 값입니다.")
    @NotEmpty(message = "nft 토큰 목록을 선택해주세요.")
    private List<Long> nftTokenList;
}
