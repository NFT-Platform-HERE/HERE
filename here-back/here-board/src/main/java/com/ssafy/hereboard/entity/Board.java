package com.ssafy.hereboard.entity;

import com.ssafy.hereboard.dto.board.SaveBoardRequestDto;
import com.ssafy.hereboard.dto.board.UpdateBoardRequestDto;
import com.ssafy.hereboard.enumeration.EnumBoardStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "board")
@EntityListeners(AuditingEntityListener.class)
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "int unsigned", nullable = false)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "title", columnDefinition = "char(20)", nullable = false)
    private String title;

    @Column(name = "content", columnDefinition = "varchar(200)", nullable = false)
    private String content;

    @CreatedDate
    @Column(name = "created_date", updatable = false, nullable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "updated_date", updatable = false, nullable = false)
    private LocalDateTime updatedDate;

    @Column(name = "deadline", nullable = false)
    private LocalDate deadline;

    @Column(name = "goal_quantity", columnDefinition = "int", nullable = false)
    private int goalQuantity;

    @Column(name = "cur_quantity", columnDefinition = "int default 0", nullable = false)
    private int curQuantity = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "char(10) default 'ACTIVE'")
    private EnumBoardStatus status = EnumBoardStatus.ACTIVE;

    public Board createBoard(Member member, SaveBoardRequestDto saveBoardRequestDto) {
        Board board = new Board();
        board.member = member;
        board.title = saveBoardRequestDto.getTitle();
        board.content = saveBoardRequestDto.getContent();
        board.deadline = saveBoardRequestDto.getDeadline();
        board.goalQuantity = saveBoardRequestDto.getGoalQuantity();
        return board;
    }

    public void updateBoard(Board board, UpdateBoardRequestDto updateBoardRequestDto) {
        board.title = updateBoardRequestDto.getTitle();
        board.content = updateBoardRequestDto.getContent();
    }

    public void deleteBoard() {
        this.status = EnumBoardStatus.DELETE;
    }

    public void closeBoard() {
        this.status = EnumBoardStatus.INACTIVE;
    }
}