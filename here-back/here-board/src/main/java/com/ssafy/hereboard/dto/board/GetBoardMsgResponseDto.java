package com.ssafy.hereboard.dto.board;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetBoardMsgResponseDto {
    private Long cheeringMsgId;
    private String content;
    private int cnt;
}
