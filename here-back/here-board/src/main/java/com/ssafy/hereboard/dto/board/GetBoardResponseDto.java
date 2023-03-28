package com.ssafy.hereboard.dto.board;

import com.ssafy.hereboard.enumeration.EnumBoardStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetBoardResponseDto {
    private Long boardId;
    private String title;
    private String content;
    private LocalDate deadline;
    private LocalDateTime dDay;
    private int percentage;
    private int curQuantity;
    private int goalQuantity;
    private LocalDateTime createdDate;
    private List<String> boardImgUrlList;
    private EnumBoardStatus status;
    private UUID memberId;
}
