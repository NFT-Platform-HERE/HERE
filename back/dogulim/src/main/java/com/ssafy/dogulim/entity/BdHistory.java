package com.ssafy.dogulim.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.dogulim.enumeration.bdHistory.EnumBdHistoryStatus;
import lombok.AllArgsConstructor;
import lombok.Cleanup;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bd_history")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BdHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "unsigned int", nullable = false)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "place", columnDefinition = "char(50)", nullable = false)
    private String place;

    @CreatedDate
    @Column(name = "issued_date", updatable = false, nullable = false)
    private LocalDateTime issuedDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "char(10) 'INACTIVE'", nullable = false)
    private EnumBdHistoryStatus status;
}
