package com.ssafy.hereauth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "stamp")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Stamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "int unsigned", nullable = false)
    private Long id;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "stage", columnDefinition = "int default 1", nullable = false)
    private int stage = 1;

    @Column(name = "step", columnDefinition = "int default 1", nullable = false)
    private int step = 1;

    public void createStamp(Member member) {
        this.member = member;
    }
}
