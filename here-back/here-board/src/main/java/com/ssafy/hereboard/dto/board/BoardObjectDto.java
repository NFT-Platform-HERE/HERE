package com.ssafy.hereboard.dto.board;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.hereboard.enumeration.EnumBoardStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class BoardObjectDto {
    private Long boardId;
    private String title;
    private String nickname;
    private String boardImgUrl;
    private EnumBoardStatus status;
    private LocalDateTime dDay;
    private int percentage;

    @QueryProjection
    public BoardObjectDto(Long boardId, String title, String nickname, String boardImgUrl, EnumBoardStatus status, LocalDateTime dDay, int percentage) {
        this.boardId = boardId;
        this.title = title;
        this.nickname = nickname;
        this.boardImgUrl = boardImgUrl;
        this.status = status;
        this.dDay = dDay;
        this.percentage = percentage;
    }
}
