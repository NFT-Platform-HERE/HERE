package com.ssafy.hereauth.dto.member;

import com.ssafy.hereauth.enumeration.certHistory.EnumCertHistoryStatus;
import com.ssafy.hereauth.enumeration.certHistory.EnumCertHistoryType;
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
    private EnumCertHistoryType type;
    private EnumCertHistoryStatus status;
    private String reason;
    private String hashValue;
}
