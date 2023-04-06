package com.ssafy.herenft.dto.nft;

import com.ssafy.herenft.eunmeration.EnumBdHistoryType;
import com.ssafy.herenft.eunmeration.EnumNftType;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Builder
public class SaveNftRequestDto {

    @NotNull(message = "tokenId는 필수 값입니다.")
    private Long tokenId;
    @NotBlank(message = "해시값을 입력해주세요.")
    private String hashValue;
    @NotNull(message = "ownerId는 필수 값입니다.")
    private UUID ownerId;
    @NotNull(message = "issuerId는 필수 값입니다.")
    private UUID issuerId;
    @NotNull(message = "이미지 url은 필수 값입니다.")
    @NotBlank(message = "이미지 url을 입력해주세요.")
    private String imgUrl;
    @NotNull(message = "혈액원은 필수 값입니다.")
    @NotBlank(message = "혈액원을 입력해주세요.")
    private String place;
    @NotNull(message = "발급 종류는 필수 값입니다.")
//    @NotBlank(message = "발급 종류를 입력해주세요.")
    private EnumNftType nftType;
    @NotNull(message = "헌혈 종류는 필수 값입니다.")
    private EnumBdHistoryType bdType;       // NFT 등록하고 나서 헌혈기록도 같이 기록됨
    @NotNull(message = "헌혈 일자를 입력해주세요.")
    private LocalDateTime createdDate;
}
