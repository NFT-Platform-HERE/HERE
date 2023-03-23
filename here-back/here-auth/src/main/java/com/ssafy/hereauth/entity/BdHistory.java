package com.ssafy.hereauth.entity;

import com.ssafy.hereauth.dto.member.BdHistoryCreateRequestDto;
import com.ssafy.hereauth.enumeration.EnumBdHistoryStatus;
import com.ssafy.hereauth.enumeration.EnumBdHistoryType;
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
@AllArgsConstructor
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

    public void createBdHistory(Member member, BdHistoryCreateRequestDto bdHistoryCreateRequestDto) {
        this.member = member;
        this.place = bdHistoryCreateRequestDto.getPlace();
        this.status = EnumBdHistoryStatus.ACTIVE;
    }
}

