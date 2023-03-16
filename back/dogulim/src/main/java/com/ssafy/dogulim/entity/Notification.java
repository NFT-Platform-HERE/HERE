package com.ssafy.dogulim.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.dogulim.enumeration.notification.EnumNotificationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "int unsigned", nullable = false)
    private Long id;

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
    private EnumNotificationStatus status;

    @CreatedDate
    @Column(name = "create_date", updatable = false, nullable = false)
    private LocalDateTime createDate;
}
