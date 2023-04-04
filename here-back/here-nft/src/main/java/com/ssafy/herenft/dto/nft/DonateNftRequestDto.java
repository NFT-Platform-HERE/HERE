package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
public class DonateNftRequestDto {
    @NotNull(message = "게시글 ID는 필수 값입니다.")
    private Long boardId;
    @NotNull(message = "송신자 ID는 필수 값입니다.")
    private UUID senderId;
    @NotNull(message = "수신자 ID는 필수 값입니다.")
    private UUID receiverId;
    @NotNull(message = "기부 NFT 목록은 필수 값입니다.")
    @NotEmpty(message = "기부 NFT 목록을 입력해주세요.")
    private List<Long> nftTokenList;
}
