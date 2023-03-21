package com.ssafy.hereboard.entity;

import com.ssafy.hereboard.enumeration.EnumBoardMsgStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "board_msg")
public class BoardMsg {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "int unsigned", nullable = false)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @Column(name = "member_id", columnDefinition = "varchar(36)", nullable = false)
    @Type(type = "uuid-char")
    private UUID memberId;

    @Column(name = "cheering_msg_id", columnDefinition = "int unsigned", nullable = false)
    private Long cheeringMsgId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "char(10)", nullable = false)
    private EnumBoardMsgStatus status = EnumBoardMsgStatus.ACTIVE;

    public void createBoardMsg(Board board, UUID memberId, Long cheeringMsgId) {
        this.board = board;
        this.memberId = memberId;
        this.cheeringMsgId = cheeringMsgId;

    }

    public void updateBoardMsg(EnumBoardMsgStatus status) {
        if (status.equals(EnumBoardMsgStatus.ACTIVE)) {
            this.status = EnumBoardMsgStatus.INACTIVE;
        } else {
            this.status = EnumBoardMsgStatus.ACTIVE;
        }
    }
}