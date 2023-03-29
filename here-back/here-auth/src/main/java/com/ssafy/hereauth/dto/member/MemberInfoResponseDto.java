package com.ssafy.hereauth.dto.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberInfoResponseDto {
    private UUID memberId;
    private String walletAddress;
}
