package com.ssafy.herenft.dto.nft;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
public class SubmitCertHospitalRequestDto {
    @NotNull(message = "멤버 ID는 필수 값입니다.")
    private UUID memberId;
    @NotNull(message = "제출 병원은 필수 값입니다.")
    private UUID agencyId;
    @NotNull(message = "제출할 nft는 필수 값입니다.")
    @NotEmpty(message = "제출할 nft를 선택해주세요.")
    private List<NftObjectDto> nftList;

}
