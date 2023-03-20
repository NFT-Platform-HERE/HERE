package com.ssafy.hereboard.dto.board;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateBoardResponseDto {
    private Long boardId;
    private String message;
}
