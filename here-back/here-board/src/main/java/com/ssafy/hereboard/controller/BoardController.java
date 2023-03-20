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
import java.util.List;
import java.util.UUID;

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

    @ApiOperation(value = "board 삭제", notes = "board를 삭제합니다.")
    @PatchMapping("/{boardId}/delete")
    public ResponseEntity<ResponseSuccessDto<DeleteBoardResponseDto>> deleteBoard(@PathVariable("boardId") Long boardId) {
        return ResponseEntity.ok(boardService.deleteBoard(boardId));
    }

    @ApiOperation(value = "board 마감", notes = "board를 마감합니다.")
    @PatchMapping("/{boardId}/close")
    public ResponseEntity<ResponseSuccessDto<CloseBoardResponseDto>> closeBoard(@PathVariable("boardId") Long boardId) {
        return ResponseEntity.ok(boardService.closeBoard(boardId));
    }

    @ApiOperation(value = "전체 board 조회", notes = "전체 board를 조회합니다.")
    @GetMapping()
    public ResponseEntity<ResponseSuccessDto<List<BoardResponseDto>>> getBoardList() {
        return ResponseEntity.ok(boardService.getBoardList());
    }

    @ApiOperation(value = "내 board 조회", notes = "회원이 작성한 board를 조회합니다.")
    @GetMapping("/member/{memberId}")
    public ResponseEntity<ResponseSuccessDto<List<BoardResponseDto>>> getMemberBoardList(@PathVariable("memberId") UUID memberId) {
        return ResponseEntity.ok(boardService.getMemberBoardList(memberId));
    }

//    @ApiOperation(value = "종료 임박 board 조회", notes = "종료가 임박한 board를 조회합니다.")
//    @GetMapping("/deadline")
//    public ResponseEntity<ResponseSuccessDto<List<BoardResponseDto>>> getDeadlineBoardList() {
//        return ResponseEntity.ok(boardService.getDeadlineBoardList());
//    }

    @ApiOperation(value = "응원 메시지 수정", notes = "응원 메시지를 수정합니다.")
    @PatchMapping("/msg")
    public ResponseEntity<ResponseSuccessDto<UpdateMsgResponseDto>> updateMsg(@RequestBody UpdateMsgRequestDto updateMsgRequestDto) {
        return ResponseEntity.ok(boardService.updateMsg(updateMsgRequestDto));
    }
}
