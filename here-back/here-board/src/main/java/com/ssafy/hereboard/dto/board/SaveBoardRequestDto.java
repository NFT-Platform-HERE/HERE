package com.ssafy.hereboard.dto.board;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
public class SaveBoardRequestDto {

    @NotNull(message = "memberId는 필수 값입니다.")
    private UUID memberId;
    @NotBlank(message = "title은 필수 값입니다.")
    private String title;
    @NotBlank(message = "content는 필수 값입니다.")
    private String content;
    @NotNull(message = "deadline은 필수 값입니다.")
    private LocalDate deadline;
    @NotNull(message = "목표 수량은 필수 값입니다.")
    private int goalQuantity;
}
