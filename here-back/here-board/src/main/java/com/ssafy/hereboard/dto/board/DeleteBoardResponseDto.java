package com.ssafy.hereboard.dto.board;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DeleteBoardResponseDto {
    private Long boardId;
    private String message;
}
