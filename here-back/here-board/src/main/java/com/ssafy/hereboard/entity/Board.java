package com.ssafy.hereboard.entity;

import com.ssafy.hereboard.enumeration.EnumBoardStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "board")
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
    private LocalDateTime createDate;

    @LastModifiedDate
    @Column(name = "updated_date", updatable = false, nullable = false)
    private LocalDateTime updatedDate;

    @Column(name = "deadline", nullable = false)
    private LocalDateTime deadline;

    @Column(name = "goal_quantity", columnDefinition = "int", nullable = false)
    private int goalQuantity;

    @Column(name = "cur_quantity", columnDefinition = "int default 0", nullable = false)
    private int curQuantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "char(10) default 'ACTIVE'", nullable = false)
    private EnumBoardStatus status;
}