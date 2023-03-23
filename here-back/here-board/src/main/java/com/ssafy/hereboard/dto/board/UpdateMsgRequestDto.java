package com.ssafy.hereboard.dto.board;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class UpdateMsgRequestDto {
    private Long boardId;
    private Long cheeringMsgId;
    private UUID memberId;
}
