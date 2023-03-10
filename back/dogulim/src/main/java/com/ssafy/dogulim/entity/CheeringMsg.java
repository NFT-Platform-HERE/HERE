package com.ssafy.dogulim.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "cheering_msg")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CheeringMsg {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "unsigned int", nullable = false)
    private Long id;

    @Column(name = "content", columnDefinition = "varchar(100)")
    private String content;
}
