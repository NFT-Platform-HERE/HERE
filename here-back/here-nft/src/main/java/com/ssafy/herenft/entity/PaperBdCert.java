package com.ssafy.herenft.entity;

import com.ssafy.herenft.eunmeration.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bd_history")
@Getter
@NoArgsConstructor
public class PaperBdCert {
    @Id
    @Column(name = "id", columnDefinition = "varchar(20)", nullable = false)
    private String id;

    @Column(name = "name", columnDefinition = "char(20)", nullable = false)
    private String name;

    @Column(name = "birth", nullable = false)
    private LocalDate birth;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender_type", columnDefinition = "char(10)", nullable = false)
    private EnumPaperBdCertGenderType genderType;

    @Enumerated(EnumType.STRING)
    @Column(name = "blood_type", columnDefinition = "char(20)", nullable = false)
    private EnumPaperBdCertBdType bloodType;

    @Enumerated(EnumType.STRING)
    @Column(name = "blood", columnDefinition = "char(10)", nullable = false)
    private EnumPaperBdCertBlood blood;

    @Enumerated(EnumType.STRING)
    @Column(name = "rh_type", columnDefinition = "char(10)", nullable = false)
    private EnumPaperBdCertRhType rhType;

    @Column(name = "blood_volume", columnDefinition = "int default 0", nullable = false)
    private int bloodVolume;

    @Column(name = "place", columnDefinition = "char(20)", nullable = false)
    private String place;

    @Column(name = "bd_date", nullable = false)
    private LocalDate bdDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "char(10)", nullable = false)
    private EnumPaperBdCertStatus status = EnumPaperBdCertStatus.INACTIVE;
}
