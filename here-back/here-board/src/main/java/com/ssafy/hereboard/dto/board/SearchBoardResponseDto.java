package com.ssafy.hereboard.dto.board;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.hereboard.entity.Board;
import com.ssafy.hereboard.enumeration.EnumBoardStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Builder
public class SearchBoardResponseDto {
    private Long boardId;
    private String title;
    private String nickname;
    private String boardImgUrl;
    private EnumBoardStatus status;
    private LocalDate dDay;
    private int percentage;

    @QueryProjection
    public SearchBoardResponseDto(Long boardId, String title, String nickname, String boardImgUrl, EnumBoardStatus status, LocalDate dDay, int percentage) {
        this.boardId = boardId;
        this.title = title;
        this.nickname = nickname;
        this.boardImgUrl = boardImgUrl;
        this.status = status;
        this.dDay = dDay;
        this.percentage = percentage;
    }

    public SearchBoardResponseDto(Board board) {

        boardId = board.getId();
        title = board.getTitle();
        nickname = board.getMember().getNickname();
        boardImgUrl = "thumbnailUrl";
        status = board.getStatus();
        dDay = board.getDeadline();
        percentage = board.getCurQuantity() / board.getGoalQuantity() * 100;
    }
}
