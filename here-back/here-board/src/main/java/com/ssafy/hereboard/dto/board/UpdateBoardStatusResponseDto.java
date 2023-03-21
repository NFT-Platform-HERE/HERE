package com.ssafy.hereboard.dto.board;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateBoardStatusResponseDto {
    private Long boardId;
    private String message;
}
