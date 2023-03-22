package com.ssafy.dogulim.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.dogulim.enumeration.certHistory.EnumCertHistoryType;
import com.ssafy.dogulim.enumeration.paperBdCert.EnumPaperBdCertType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "cert_history")
@Getter
@NoArgsConstructor
@AllArgsConstructor
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

    @CreatedDate
    @Column(name = "created_date", updatable = false, nullable = false)
    private LocalDateTime createdDate;

    @Column(name = "reason", columnDefinition = "varchar(50)", nullable = false)
    private String reason;

    @Column(name = "hash_value", columnDefinition = "varchar(200)", nullable = false)
    private String hashValue;

    @Column(name = "token_id", columnDefinition = "int unsigned", nullable = false)
    private Long tokenId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "char(20)", nullable = false)
    private EnumCertHistoryType status;
}
