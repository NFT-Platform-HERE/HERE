package com.ssafy.hereboard.dto.board;

import com.ssafy.hereboard.enumeration.EnumBoardStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateBoardStatusRequestDto {
    private Long boardId;
    private UUID writerId;
    private EnumBoardStatus status;
}
