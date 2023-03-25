package com.ssafy.hereauth.dto.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberInfoResponseDto {
    private UUID memberId;
    private String walletAddress;
}
