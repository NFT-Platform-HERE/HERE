package com.ssafy.hereboard.dto.board;

import com.ssafy.hereboard.enumeration.EnumBoardImgStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UpdateBoardImgObject {
    private Long boardImgId;
    private EnumBoardImgStatus status;
    private int orders;
}
