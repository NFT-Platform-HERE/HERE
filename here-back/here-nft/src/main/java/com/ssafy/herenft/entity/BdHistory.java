package com.ssafy.herenft.entity;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.herenft.dto.nft.SaveNftRequestDto;
import com.ssafy.herenft.eunmeration.EnumBdHistoryStatus;
import com.ssafy.herenft.eunmeration.EnumBdHistoryType;
import com.ssafy.herenft.repository.BdHistoryRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bd_history")
@Getter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class BdHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "int unsigned", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "place", columnDefinition = "varchar(50)", nullable = false)
    private String place;

    @CreatedDate
    @Column(name = "issued_date", updatable = false, nullable = false)
    private LocalDateTime issuedDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "char(10) default 'INACTIVE'", nullable = false)
    private EnumBdHistoryStatus status = EnumBdHistoryStatus.INACTIVE;

    @Enumerated(EnumType.STRING)
    @Column(name = "bd_type", columnDefinition = "char(20)", nullable = false)
    private EnumBdHistoryType bdType;

    @QueryProjection
    public BdHistory(Long id, Member member, String place, LocalDateTime issuedDate, EnumBdHistoryStatus status, EnumBdHistoryType bdType) {
        this.id = id;
        this.member = member;
        this.place = place;
        this.issuedDate = issuedDate;
        this.status = status;
        this.bdType = bdType;
    }

    public void createBdHistory(Member member, SaveNftRequestDto saveNftRequestDto) {
        this.member = member;
        this.place = saveNftRequestDto.getPlace();
        this.bdType = saveNftRequestDto.getBdType();
    }
}

