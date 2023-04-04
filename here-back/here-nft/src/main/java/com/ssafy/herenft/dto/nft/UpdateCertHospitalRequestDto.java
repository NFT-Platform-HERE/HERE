package com.ssafy.herenft.dto.nft;

import lombok.Getter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
public class UpdateCertHospitalRequestDto {
    @NotNull(message = "토큰 ID 목록은 필수 값입니다.")
    @NotEmpty(message = "토큰 ID 목록을 입력해주세요.")
    private List<Long> tokenIdList;
}
