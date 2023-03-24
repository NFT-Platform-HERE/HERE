package com.ssafy.hereauth.dto.member;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StampGetResponseDto {
    private int stage;
    private int step;
}
