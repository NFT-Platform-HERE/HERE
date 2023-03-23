package com.ssafy.hereboard.dto.board;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.UUID;

@Getter
@Builder
public class UpdateBoardRequestDto {
    private Long boardId;
    private UUID writerId;
    private String title;
    private String content;
    private List<String> imgUrlList;
}
