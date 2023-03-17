package com.ssafy.hereboard.entity;

import com.ssafy.hereboard.enumeration.EnumBoardMsgStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    @Column(name = "member_id", columnDefinition = "binary(16)", nullable = false)
    private UUID memberId;

    @Column(name = "cheering_msg_id", columnDefinition = "int unsigned", nullable = false)
    private Long cheeringMsgId;

    @Column(name = "status", columnDefinition = "char(10)", nullable = false)
    private EnumBoardMsgStatus status;
}