package com.ssafy.herenft.entity;

import com.ssafy.herenft.eunmeration.EnumPaperBdCertBdType;
import com.ssafy.herenft.eunmeration.EnumPaperBdCertStatus;
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

    @Column(name = "gender", columnDefinition = "char(10)", nullable = false)
    private String gender;

    @Enumerated(EnumType.STRING)
    @Column(name = "bd_type", columnDefinition = "char(20)", nullable = false)
    private EnumPaperBdCertBdType bdType;

    @Column(name = "place", columnDefinition = "char(20)", nullable = false)
    private String place;

    @Column(name = "bd_date", nullable = false)
    private LocalDate bdDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "char(10)", nullable = false)
    private EnumPaperBdCertStatus status = EnumPaperBdCertStatus.INACTIVE;
}
