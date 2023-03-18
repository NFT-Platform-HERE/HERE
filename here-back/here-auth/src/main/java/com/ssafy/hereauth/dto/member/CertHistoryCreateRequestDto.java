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
public class CertHistoryCreateRequestDto {
    private UUID memberId;
    private UUID agencyId;
//    private String type;
    private String reason;
    private String hashValue;
}
