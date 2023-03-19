package com.ssafy.hereauth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.ssafy.dogulim.enumeration.certHistory.EnumCertHistoryType;
//import com.ssafy.dogulim.enumeration.paperBdCert.EnumPaperBdCertType;
import com.ssafy.hereauth.dto.member.CertHistoryCreateRequestDto;
import com.ssafy.hereauth.enumeration.bdHistory.EnumBdHistoryStatus;
import com.ssafy.hereauth.enumeration.certHistory.EnumCertHistoryStatus;
import com.ssafy.hereauth.enumeration.certHistory.EnumCertHistoryType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "cert_history")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class CertHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "int unsigned", nullable = false)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "agency_id", nullable = false)
    private Member agency;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", columnDefinition = "char(20)")
    private EnumCertHistoryType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "char(20)")
    private EnumCertHistoryStatus status;

    @CreatedDate
    @Column(name = "create_date", updatable = false, nullable = false)
    private LocalDateTime createDate;

    @Column(name = "reason", columnDefinition = "varchar(50)")
    private String reason;

    @Column(name = "hash_value", columnDefinition = "varchar(200)", nullable = false)
    private String hashValue;

    public void createCertHistory(Member member, Member agency, CertHistoryCreateRequestDto certHistoryCreateRequestDto) {
        this.member = member;
        this.agency = agency;
        this.type = certHistoryCreateRequestDto.getType();
        this.status = EnumCertHistoryStatus.ACTIVE;
        this.reason = certHistoryCreateRequestDto.getReason();
        this.hashValue = certHistoryCreateRequestDto.getHashValue();
    }

}
