package com.ssafy.hereboard.dto.board;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
public class UpdateBoardRequestDto {
    private Long boardId;
    private UUID writerId;
    private String title;
    private String content;
    private LocalDate deadline;
    private Integer goalQuantity;
}
