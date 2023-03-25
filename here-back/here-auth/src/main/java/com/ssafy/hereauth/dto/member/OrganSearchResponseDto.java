package com.ssafy.hereauth.dto.member;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class OrganSearchResponseDto {
    private UUID agencyId;
    private String agencyName;
}
