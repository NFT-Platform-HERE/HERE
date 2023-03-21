package com.ssafy.dogulim.entity;

import com.ssafy.dogulim.enumeration.nft.EnumNftType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "nft")
public class Nft {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "varchar(200)", nullable = false)
    private String id;

    @Column(name = "owner_id", columnDefinition = "varchar(36)", nullable = false)
    @Type(type = "uuid-char")
    private UUID ownerId;

    @Column(name = "issuer_id", columnDefinition = "varchar(36)", nullable = false)
    @Type(type = "uuid-char")
    private UUID issuerId;

    @Column(name = "img_url", columnDefinition = "varchar(200)", nullable = false)
    private String imgUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", columnDefinition = "char(10)", nullable = false)
    private EnumNftType type;

    @CreatedDate
    @Column(name = "created_date", updatable = false, nullable = false)
    private LocalDateTime createdDate;
}
