package com.ssafy.hereboard.dto.board;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CloseBoardResponseDto {
    private Long boardId;
    private String message;
}
