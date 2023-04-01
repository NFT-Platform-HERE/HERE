package com.ssafy.hereboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.hereboard.enumeration.EnumBoardImgStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "board_img")
public class BoardImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "int unsigned", nullable = false)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @Column(name = "img_url", columnDefinition = "varchar(200)")
    private String imgUrl;

    @Column(name = "status", columnDefinition = "char(10)")
    private EnumBoardImgStatus status = EnumBoardImgStatus.ACTIVE;

    @Column(name = "orders", columnDefinition = "")
    private int orders;

    public void createBoardImg(Board board, String imgUrl, int orders) {
        this.board = board;
        this.imgUrl = imgUrl;
        this.orders = orders;
    }

    public void updateBoardImg(EnumBoardImgStatus status, int order) {
        this.status = status;
        this.orders = order;
    }
}