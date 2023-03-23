package com.ssafy.hereboard.dto.board;

import com.ssafy.hereboard.enumeration.EnumBoardStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateBoardStatusResponseDto {
    private Long boardId;
    private String message;
}
