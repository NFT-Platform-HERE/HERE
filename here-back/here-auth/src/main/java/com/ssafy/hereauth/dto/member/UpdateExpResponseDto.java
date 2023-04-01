package com.ssafy.hereauth.dto.member;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateExpResponseDto {
    private int level;
    private String message;
}
