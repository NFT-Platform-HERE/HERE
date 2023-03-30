package com.ssafy.hereauth.dto.member;

import com.ssafy.hereauth.enumeration.EnumCharacterType;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class MemberProfileResponseDto {
    private String email;
    private String nickname;
    private String characterImgUrl;
    private EnumCharacterType characterType;
    private int level;
    private int bdCnt;
    private LocalDateTime createdDate;
    private LocalDateTime recentBdDate;
    private int nextWholeBdDays;
    private int nextNotWholeBdDays;
}
