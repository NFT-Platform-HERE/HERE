package com.ssafy.hereboard.dto.board;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class SaveBoardRequestDto {

    @NotBlank(message = "memberId는 필수 값입니다.")
    private UUID memberId;
    @NotBlank(message = "title은 필수 값입니다.")
    private String title;
    @NotBlank(message = "content는 필수 값입니다.")
    private String content;
    @NotBlank(message = "deadline은 필수 값입니다.")
    private LocalDate deadline;
    @NotBlank(message = "목표 수향은 필수 값입니다.")
    private int goalQuantity;
    private List<String> imgUrlList;
}
