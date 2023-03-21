package com.ssafy.hereboard.dto.board;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class UpdateBoardRequestDto {
    private Long boardId;
    private String title;
    private String content;
    private List<String> imgUrlList;
}
