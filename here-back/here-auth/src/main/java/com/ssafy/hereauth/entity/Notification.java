package com.ssafy.hereauth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.hereauth.enumeration.EnumNotificationStatus;
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

    @CreatedDate
    @Column(name = "created_date", updatable = false, nullable = false)
    private LocalDateTime createdDate;

    public Notification createNotification(Member sender, Member receiver, String content) {
        Notification notification = new Notification();
        notification.sender = sender;
        notification.receiver = receiver;
        notification.content = content;
        return notification;
    }

    public void updateNotificationStatus() {
        this.status = EnumNotificationStatus.ACTIVE;
    }
}

