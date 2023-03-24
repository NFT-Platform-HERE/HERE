package com.ssafy.hereboard.dto.board;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class UpdateBoardBdHistoryRequestDto {
    private Long boardId;
    private UUID senderId;
    private int quantity;
}
