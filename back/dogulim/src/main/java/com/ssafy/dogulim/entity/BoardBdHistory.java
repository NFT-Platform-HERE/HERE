package com.ssafy.dogulim.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    @Column(name = "sender_id", columnDefinition = "binary(16)", nullable = false)
    private UUID senderId;

    @Column(name = "quantity", columnDefinition = "int", nullable = false)
    private int quantity;
}
