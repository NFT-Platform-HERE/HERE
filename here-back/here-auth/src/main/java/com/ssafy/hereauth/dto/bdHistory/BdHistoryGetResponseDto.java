package com.ssafy.hereauth.dto.bdHistory;

import com.ssafy.hereauth.enumeration.EnumBdHistoryType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class BdHistoryGetResponseDto {
    private Long bdHistoryId;
    private LocalDateTime issuedDate;
    private String place;
    private EnumBdHistoryType bdType;
}
