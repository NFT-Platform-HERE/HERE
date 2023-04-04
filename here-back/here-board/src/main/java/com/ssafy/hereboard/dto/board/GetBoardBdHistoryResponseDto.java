package com.ssafy.hereboard.dto.board;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GetBoardBdHistoryResponseDto {
    private String hashValue;
}
