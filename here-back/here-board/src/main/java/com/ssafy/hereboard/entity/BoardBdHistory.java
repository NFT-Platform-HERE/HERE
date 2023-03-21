package com.ssafy.hereboard.entity;

import com.ssafy.hereboard.dto.board.SaveBoardRequestDto;
import com.ssafy.hereboard.dto.board.UpdateBoardBdHistoryRequestDto;
import com.ssafy.hereboard.dto.board.UpdateBoardRequestDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "board_bd_history")
public class BoardBdHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "int unsigned", nullable = false)
    private Long id;

    @Column(name = "board_id", columnDefinition = "int unsigned", nullable = false)
    private Long boardId;

    @Column(name = "sender_id", columnDefinition = "varchar(36)", nullable = false)
    @Type(type = "uuid-char")
    private UUID senderId;

    @Column(name = "quantity", columnDefinition = "int", nullable = false)
    private int quantity;

    public BoardBdHistory createBoardBdHistory(UpdateBoardBdHistoryRequestDto updateBoardBdHistoryRequestDto) {
        BoardBdHistory boardBdHistory = new BoardBdHistory();
        boardBdHistory.boardId = updateBoardBdHistoryRequestDto.getBoardId();
        boardBdHistory.senderId = updateBoardBdHistoryRequestDto.getSenderId();
        boardBdHistory.quantity = updateBoardBdHistoryRequestDto.getQuantity();
        return boardBdHistory;
    }

    public void updateBoardBdHistory(int quantity) {
        this.quantity = quantity;
    }
}
