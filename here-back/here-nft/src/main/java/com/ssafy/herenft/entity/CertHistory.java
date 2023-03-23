package com.ssafy.herenft.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.herenft.dto.nft.NftObjectDto;
import com.ssafy.herenft.dto.nft.SubmitCertAgencyRequestDto;
import com.ssafy.herenft.dto.nft.SubmitCertHospitalRequestDto;
import com.ssafy.herenft.eunmeration.EnumBdHistoryStatus;
import com.ssafy.herenft.eunmeration.EnumCertHistoryStatus;
import com.ssafy.herenft.eunmeration.EnumCertHistoryType;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @Column(name = "status", columnDefinition = "char(10) default 'INACTIVE'", nullable = false)
    private EnumCertHistoryStatus status = EnumCertHistoryStatus.INACTIVE;

    @CreatedDate
    @Column(name = "created_date", updatable = false, nullable = false)
    private LocalDateTime createdDate;

    @Column(name = "reason", columnDefinition = "varchar(50)")
    private String reason;

    @Column(name = "token_id", columnDefinition = "int unsigned", nullable = false)
    private Long tokenId;

    @Column(name = "hash_value", columnDefinition = "varchar(200)", nullable = false)
    private String hashValue;

    public CertHistory createCertHistoryAgency(Member member, Member agency, SubmitCertAgencyRequestDto submitCertAgencyRequestDto) {
        CertHistory certHistory = new CertHistory();
        certHistory.member = member;
        certHistory.agency = agency;
        certHistory.type = EnumCertHistoryType.AGENCY;
        certHistory.reason = submitCertAgencyRequestDto.getReason();
        certHistory.tokenId = submitCertAgencyRequestDto.getTokenId();
        certHistory.hashValue = submitCertAgencyRequestDto.getHashValue();
        return certHistory;
    }

    public CertHistory createCertHistoryHospital(Member member, Member agency, SubmitCertHospitalRequestDto submitCertHospitalRequestDto, NftObjectDto nft) {
        CertHistory certHistory = new CertHistory();
        certHistory.member = member;
        certHistory.agency = agency;
        certHistory.type = EnumCertHistoryType.HOSPITAL;
        certHistory.tokenId = nft.getTokenId();
        certHistory.hashValue = nft.getHashValue();
        return certHistory;
    }


//    public void createCertHistory(Member member, Member agency, CertHistoryCreateRequestDto certHistoryCreateRequestDto) {
//        this.member = member;
//        this.agency = agency;
//        this.type = certHistoryCreateRequestDto.getType();
//        this.status = EnumCertHistoryStatus.ACTIVE;
//        this.reason = certHistoryCreateRequestDto.getReason();
//        this.hashValue = certHistoryCreateRequestDto.getHashValue();
//    }

}
