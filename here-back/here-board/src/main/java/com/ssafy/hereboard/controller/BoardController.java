package com.ssafy.hereboard.controller;


import com.ssafy.hereboard.dto.board.*;
import com.ssafy.hereboard.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereboard.service.BoardService;
import com.ssafy.hereboard.service.S3Service;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Api("기부해요 컨트롤러 V1")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;
    private final S3Service s3Service;

    @ApiOperation(value = "board 등록", notes = "board를 등록합니다.")
    @PostMapping(value = "", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseSuccessDto<SaveBoardResponseDto>> save(
            @RequestPart @Valid SaveBoardRequestDto saveBoardRequestDto,
            @RequestPart(value = "multipartFileList", required = false)List<MultipartFile> multipartFileList) throws Exception{
        List<String> imgUrlList = new ArrayList<>();
        if(multipartFileList != null) {
            imgUrlList = s3Service.upload(multipartFileList);
        }
        return ResponseEntity.ok(boardService.save(saveBoardRequestDto, imgUrlList));
    }

    @ApiOperation(value = "board 상세 조회", notes = "board의 상세 정보를 조회합니다.")
    @GetMapping("/{boardId}")
    public ResponseEntity<ResponseSuccessDto<GetBoardResponseDto>> getBoard(@PathVariable("boardId") Long boardId) {
        return ResponseEntity.ok(boardService.getBoard(boardId));
    }

    @ApiOperation(value = "board 수정", notes = "board를 수정합니다.")
    @PatchMapping(value = "/update", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseSuccessDto<UpdateBoardResponseDto>> updateBoard(
            @RequestPart UpdateBoardRequestDto updateBoardRequestDto,
            @RequestPart(value = "multipartFileList", required = false) List<MultipartFile> multipartFileList) throws Exception {
        List<String> imgUrlList = new ArrayList<>();
        if (multipartFileList != null) {
            imgUrlList = s3Service.upload(multipartFileList);
        }
        return ResponseEntity.ok(boardService.updateBoard(updateBoardRequestDto, imgUrlList));
    }

    @ApiOperation(value = "board 삭제/마감", notes = "board를 삭제 또는 마감합니다.")
    @PatchMapping()
    public ResponseEntity<ResponseSuccessDto<UpdateBoardStatusResponseDto>> updateBoardStatus(
            @RequestBody UpdateBoardStatusRequestDto updateBoardStatusRequestDto) {
        return ResponseEntity.ok(boardService.updateBoardStatus(updateBoardStatusRequestDto));
    }

    @ApiOperation(value = "전체 board 조회", notes = "전체 board를 조회합니다.")
    @GetMapping()
    public ResponseEntity<ResponseSuccessDto<List<BoardObjectDto>>> getBoardList() {
        return ResponseEntity.ok(boardService.getBoardList());
    }

    @ApiOperation(value = "내 글 보기", notes = "본인이 작성한 board 목록을 조회합니다.")
    @GetMapping("/member/{memberId}")
    public ResponseEntity<ResponseSuccessDto<List<BoardObjectDto>>> getMyBoardList(@PathVariable("memberId") UUID memberId) {
        return ResponseEntity.ok(boardService.getMyBoardList(memberId));
    }

    @ApiOperation(value = "종료 임박 board 조회", notes = "종료가 임박한 board를 조회합니다.")
    @GetMapping("/deadline")
    public ResponseEntity<ResponseSuccessDto<List<BoardObjectDto>>> getDeadlineBoardList() {
        return ResponseEntity.ok(boardService.getDeadlineBoardList());
    }

    @ApiOperation(value = "응원 메시지 수정", notes = "응원 메시지를 수정합니다.")
    @PatchMapping("/msg")
    public ResponseEntity<ResponseSuccessDto<UpdateMsgResponseDto>> updateMsg(@RequestBody UpdateMsgRequestDto updateMsgRequestDto) {
        System.out.println("멤버아이디 확인" + updateMsgRequestDto.getMemberId());
        return ResponseEntity.ok(boardService.updateMsg(updateMsgRequestDto));
    }

    @ApiOperation(value = "게시글 응원 메시지별 카운트 조회", notes = "게시글의 응원 메시지별 카운트 및 선택 여부를 조회합니다.")
    @GetMapping("/msg/{boardId}/{memberId}")
    public ResponseEntity<ResponseSuccessDto<List<GetBoardMsgResponseDto>>> getBoardMsgList(@PathVariable("boardId") Long boardId, @PathVariable("memberId") UUID memberId) {
        return ResponseEntity.ok(boardService.getBoardMsgList(boardId, memberId));
    }

    @ApiOperation(value = "게시글 검색 (작성자 + 제목/내용)", notes = "게시글을 검색합니다.")
    @GetMapping("/search")
    public ResponseEntity<ResponseSuccessDto<List<SearchBoardResponseDto>>> searchBoard(@RequestParam String query) {
        return ResponseEntity.ok(boardService.searchBoard(query));
    }

//    @ApiOperation(value = "기부 내역 등록", notes = "기부한 내역을 생성/수정합니다.")
//    @PatchMapping("/bd-history")
//    public ResponseEntity<ResponseSuccessDto<UpdateBoardBdHistoryResponseDto>> updateBoardBdHistory(@RequestBody UpdateBoardBdHistoryRequestDto updateBoardBdHistoryRequestDto) {
//        return ResponseEntity.ok(boardService.updateBoardBdHistory(updateBoardBdHistoryRequestDto));
//    }
}
