package com.ssafy.hereboard.controller;


import com.ssafy.hereboard.dto.board.*;
import com.ssafy.hereboard.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereboard.enumeration.EnumBoardStatus;
import com.ssafy.hereboard.service.BoardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
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

    @ApiOperation(value = "board 삭제/마감", notes = "board를 삭제 또는 마감합니다.")
    @PatchMapping("/{boardId}/{status}")
    public ResponseEntity<ResponseSuccessDto<UpdateBoardStatusResponseDto>> updateBoardStatus(
            @RequestBody UpdateBoardStatusRequestDto updateBoardStatusRequestDto) {
        return ResponseEntity.ok(boardService.updateBoardStatus(updateBoardStatusRequestDto));
    }

//    @ApiOperation(value = "board 마감", notes = "board를 마감합니다.")
//    @PatchMapping("/{boardId}/close")
//    public ResponseEntity<ResponseSuccessDto<CloseBoardResponseDto>> closeBoard(@PathVariable("boardId") Long boardId) {
//        return ResponseEntity.ok(boardService.closeBoard(boardId));
//    }

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
        System.out.println("멤버아이디 확인" + updateMsgRequestDto.getMemberId());
        return ResponseEntity.ok(boardService.updateMsg(updateMsgRequestDto));
    }

    @ApiOperation(value = "응원 메시지 수정", notes = "응원 메시지를 수정합니다.")
    @GetMapping("/{boardId}/msg")
    public ResponseEntity<ResponseSuccessDto<List<GetBoardMsgResponseDto>>> getBoardMsgList(@PathVariable("boardId") Long boardId) {
        return ResponseEntity.ok(boardService.getBoardMsgList(boardId));
    }

    @ApiOperation(value = "게시글 검색 (작성자 + 제목/내용)", notes = "게시글을 검색합니다.")
    @GetMapping("/search")
    public ResponseEntity<ResponseSuccessDto<List<SearchBoardResponseDto>>> searchBoard(@RequestParam String query) {
        return ResponseEntity.ok(boardService.searchBoard(query));
    }

    @ApiOperation(value = "기부 내역 등록", notes = "기부한 내역을 생성/수정합니다.")
    @PatchMapping("/bd-history")
    public ResponseEntity<ResponseSuccessDto<UpdateBoardBdHistoryResponseDto>> updateBoardBdHistory(@RequestBody UpdateBoardBdHistoryRequestDto updateBoardBdHistoryRequestDto) {
        return ResponseEntity.ok(boardService.updateBoardBdHistory(updateBoardBdHistoryRequestDto));
    }

    @ApiOperation(value = "기부 내역 조회", notes = "기부한 내역을 조회합니다.")
    @GetMapping("/nft/{senderId}/{quantity}")
    public ResponseEntity<ResponseSuccessDto<List<GetBoardBdHistoryResponseDto>>> getBoardBdHistory(
            @PathVariable("senderId") UUID senderId,
            @PathVariable("quantity") int quantity) {
        return ResponseEntity.ok(boardService.getBoardBdHistory(senderId, quantity));
    }

//    @ApiOperation(value = "기부 해시값 조회(자동 선택)", notes = "기부 시 자동으로 선택되는 해시값을 조회합니다.")
//    @GetMapping("/nft/{senderId}/{quantity}")
//    public ResponseEntity<ResponseSuccessDto<List<GetBoardBdHistoryResponseDto>>> getBoardBdHistory(
//            @PathVariable("senderId") UUID senderId,
//            @PathVariable("quantity") int quantity) {
//        return ResponseEntity.ok(boardService.getBoardBdHistory(senderId, quantity));
//    }
}
