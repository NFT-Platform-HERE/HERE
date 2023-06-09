package com.ssafy.hereboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.hereboard.enumeration.EnumNotificationCode;
import com.ssafy.hereboard.enumeration.EnumNotificationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "int unsigned", nullable = false)
    private Long id;

    @Column(name = "nft_id", columnDefinition = "int unsigned", nullable = false)
    private Long nftId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender", nullable = false)
    private Member sender;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "receiver", nullable = false)
    private Member receiver;

    @Column(name = "content", columnDefinition = "varchar(20)")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", columnDefinition = "char(10) default 'INACTIVE'")
    private EnumNotificationStatus status = EnumNotificationStatus.INACTIVE;

    @Enumerated(EnumType.STRING)
    @Column(name = "code", columnDefinition = "char(10)")
    private EnumNotificationCode code;

    @CreatedDate
    @Column(name = "created_date", updatable = false, nullable = false)
    private LocalDateTime createdDate;

}
