package com.ssafy.hereauth.dto.member;

import com.ssafy.hereauth.enumeration.EnumMemberRole;
import lombok.*;

import java.util.UUID;

@Getter
@Builder
public class IsMemberResponseDto {
    private EnumMemberRole role;
    private UUID memberId;
    private String nickname;
    private String characterImgUrl;
    private String message;
}
