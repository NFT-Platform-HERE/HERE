package com.ssafy.hereboard.controller;


import com.ssafy.hereboard.dto.board.*;
import com.ssafy.hereboard.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereboard.service.BoardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Api("기부해요 컨트롤러 V1")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;

    @ApiOperation(value = "board 등록", notes = "board를 등록합니다.")
    @PostMapping()
    public ResponseEntity<ResponseSuccessDto<SaveBoardResponseDto>> save(@RequestBody @Valid SaveBoardRequestDto saveBoardRequestDto) {
        return ResponseEntity.ok(boardService.save(saveBoardRequestDto));
    }

    @ApiOperation(value = "board 상세 조회", notes = "board의 상세 정보를 조회합니다.")
    @GetMapping("/{boardId}")
    public ResponseEntity<ResponseSuccessDto<GetBoardResponseDto>> getBoard(@PathVariable("boardId") Long boardId) {
        return ResponseEntity.ok(boardService.getBoard(boardId));
    }

    @ApiOperation(value = "board 수정", notes = "board를 수정합니다.")
    @PatchMapping("/update")
    public ResponseEntity<ResponseSuccessDto<UpdateBoardResponseDto>> updateBoard(@RequestBody UpdateBoardRequestDto updateBoardRequestDto) {
        return ResponseEntity.ok(boardService.updateBoard(updateBoardRequestDto));
    }
}
