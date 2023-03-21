package com.ssafy.hereboard.dto.board;

import com.ssafy.hereboard.entity.Board;
import com.ssafy.hereboard.entity.BoardImg;
import com.ssafy.hereboard.enumeration.EnumBoardStatus;
import com.ssafy.hereboard.repository.BoardImgRepository;
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
    private String boardImgUrl;
    private EnumBoardStatus status;
    private LocalDate dDay;
    private int percentage;

//    public BoardResponseDto(Board board) {
//
//        boardId = board.getId();
//        title = board.getTitle();
//        nickname = board.getMember().getNickname();
//        boardImgUrl = board
//        status = board.getStatus();
//        dDay = board.getDeadline();
//        percentage = board.getCurQuantity() / board.getGoalQuantity() * 100;
//    }

//    public String getThumbnail(Board board) {
//        final BoardImgRepository boardImgRepository = null;
//
//        Long boardId = board.getId();
//        List<BoardImg> boardImgList = null.findAllByBoardId(boardId);
//        boardImgList.get(0).getImgUrl()
//
//        System.out.println("여기서 썸네일 확인" + thumbnail);
//        return thumbnail;
//    }
}
