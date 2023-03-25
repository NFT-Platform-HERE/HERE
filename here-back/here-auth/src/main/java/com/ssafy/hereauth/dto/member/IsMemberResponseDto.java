package com.ssafy.hereauth.dto.member;

import com.ssafy.hereauth.enumeration.EnumMemberRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class IsMemberResponseDto {
    private EnumMemberRole role;
    private UUID memberId;
    private String nickname;
    private String characterImgUrl;
    private String message;
}
