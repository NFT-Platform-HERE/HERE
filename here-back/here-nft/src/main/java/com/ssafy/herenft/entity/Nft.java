package com.ssafy.herenft.entity;

import com.ssafy.herenft.dto.nft.SaveNftRequestDto;
import com.ssafy.herenft.eunmeration.EnumNftType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "nft")
@EntityListeners(AuditingEntityListener.class)
public class Nft {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "int unsigned", nullable = false)
    private Long id;

    @Column(name = "token_id", columnDefinition = "int unsigned", nullable = false)
    private Long tokenId;

    @Column(name = "owner_id", columnDefinition = "varchar(36)", nullable = false)
    @Type(type = "uuid-char")
    private UUID ownerId;

    @Column(name = "issuer_id", columnDefinition = "varchar(36)", nullable = false)
    @Type(type = "uuid-char")
    private UUID issuerId;

    @Column(name = "place", columnDefinition = "varchar(50)", nullable = false)
    private String place;

    @Column(name = "hash_value", columnDefinition = "varchar(200)", nullable = false)
    private String hashValue;

    @Column(name = "img_url", columnDefinition = "varchar(200)", nullable = false)
    private String imgUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", columnDefinition = "char(10)", nullable = false)
    private EnumNftType type;

//    @CreatedDate
    @Column(name = "created_date", updatable = false, nullable = false)
    private LocalDateTime createdDate;


    public void createNft(SaveNftRequestDto saveNftRequestDto) {
        this.tokenId = saveNftRequestDto.getTokenId();
        this.hashValue = saveNftRequestDto.getHashValue();
        this.place = saveNftRequestDto.getPlace();
        this.ownerId = saveNftRequestDto.getOwnerId();
        this.issuerId = saveNftRequestDto.getIssuerId();
        this.imgUrl = saveNftRequestDto.getImgUrl();
        this.type = saveNftRequestDto.getNftType();
        this.createdDate = saveNftRequestDto.getCreatedDate();
    }

    public void updateOwnership(UUID ownerId) {
        this.ownerId = ownerId;
    }
}
