package com.ssafy.hereauth.dto.member;

import com.ssafy.hereauth.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfileResponseDto {
    private String email;
    private String nickname;
    private String characterImgUrl;
    private int level;
    private int bdCnt;
    private LocalDateTime createdDate;
    private LocalDateTime recentBdDate;
    private int nextWholeBdDays;
    private int nextNotWholeBdDays;

    public MemberProfileResponseDto(Member member, String characterImgUrl, Integer bdHistoryCnt, LocalDateTime recentBdDate, int nextWholeBdDays, int nextNotWholeBdDays) {
        this.email = member.getEmail();
        this.nickname = member.getNickname();
        this.characterImgUrl = characterImgUrl;
        this.level = member.getLevel();
        this.bdCnt = bdHistoryCnt;
        this.createdDate = member.getCreatedDate();
        this.recentBdDate = recentBdDate;
        this.nextWholeBdDays = nextWholeBdDays;
        this.nextNotWholeBdDays = nextNotWholeBdDays;
    }
}
