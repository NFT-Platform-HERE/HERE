package com.ssafy.hereboard.dto.board;

import lombok.*;

@Getter
@Builder
public class SaveBoardResponseDto {
    private Long boardId;
    private String message;
}
