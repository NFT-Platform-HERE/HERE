package com.ssafy.hereboard.dto.board;

import com.ssafy.hereboard.entity.Board;
import com.ssafy.hereboard.enumeration.EnumBoardStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardResponseDto {
    private Long boardId;
    private String title;
    private String nickname;
    private EnumBoardStatus status;
    private LocalDate dDay;
    private int percentage;

    public BoardResponseDto(Board board) {
        boardId = board.getId();
        title = board.getTitle();
        nickname = board.getMember().getNickname();
        status = board.getStatus();
        dDay = board.getDeadline();
        percentage = board.getCurQuantity() / board.getGoalQuantity() * 100;


    }
}
