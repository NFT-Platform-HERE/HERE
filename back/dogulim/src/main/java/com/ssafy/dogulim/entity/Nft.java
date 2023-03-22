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
    @Column(name = "token_id", columnDefinition = "int unsigned", nullable = false)
    private Long tokenId;

    @Column(name = "owner_id", columnDefinition = "varchar(36)", nullable = false)
    @Type(type = "uuid-char")
    private UUID ownerId;

    @Column(name = "issuer_id", columnDefinition = "varchar(36)", nullable = false)
    @Type(type = "uuid-char")
    private UUID issuerId;

    @Column(name = "hash_value", columnDefinition = "varchar(200)", nullable = false)
    private String hashValue;

    @Column(name = "img_url", columnDefinition = "varchar(200)", nullable = false)
    private String imgUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", columnDefinition = "char(10)", nullable = false)
    private EnumNftType type;

    @CreatedDate
    @Column(name = "created_date", updatable = false, nullable = false)
    private LocalDateTime createdDate;
}
