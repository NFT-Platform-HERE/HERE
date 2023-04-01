package com.ssafy.hereauth.dto.bdHistory;

import com.ssafy.hereauth.enumeration.EnumBdHistoryType;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Getter
public class BdHistoryCreateRequestDto {
    @NotNull(message = "memberId는 필수 값입니다.")
    private UUID memberId;
    @NotNull(message = "현혈 장소는 필수 값입니다.")
    @NotBlank(message = "헌혈 장소값을 입력해주세요.")
    private String place;

    @NotNull(message = "헌혈 타입은 필수 값입니다.")
    @NotBlank(message = "헌혈 타입값을 입력해주세요.")
    private EnumBdHistoryType type;
}
