package com.ssafy.dogulim.entity;

import com.ssafy.dogulim.enumeration.member.EnumMemberRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "member")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", columnDefinition = "char(10) default 'USER'", nullable = false)
    private EnumMemberRole role;

    @Column(name = "wallet_address", columnDefinition = "char(100)", nullable = false, updatable = false)
    private String walletAddress;

    @Column(name = "name", columnDefinition = "char(20)", nullable = false)
    private String name;

    @Column(name = "nickname", columnDefinition = "char(20)", nullable = false)
    private String nickname;

    @Column(name = "email", columnDefinition = "char(50)", nullable = false)
    private String email;

    @Column(name = "pw", columnDefinition = "varchar(50)", nullable = false)
    private String pw;

    @Column(name = "level", columnDefinition = "int default 1", nullable = false)
    private int level;

    @Column(name = "cur_exp", columnDefinition = "int default 0", nullable = false)
    private int curExp;

    @Column(name = "goal_exp", columnDefinition = "int default 50", nullable = false)
    private int goalExp;

    @CreatedDate
    @Column(name = "create_date", updatable = false, nullable = false)
    private LocalDateTime createDate;

}
