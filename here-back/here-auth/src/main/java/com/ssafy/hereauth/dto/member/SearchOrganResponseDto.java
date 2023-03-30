package com.ssafy.hereauth.dto.member;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class SearchOrganResponseDto {
    private UUID agencyId;
    private String agencyName;
}
