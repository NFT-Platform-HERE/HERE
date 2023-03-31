package com.ssafy.hereboard.service;

import com.ssafy.hereboard.dto.board.*;
import com.ssafy.hereboard.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereboard.entity.*;
import com.ssafy.hereboard.enumeration.EnumBoardMsgStatus;
import com.ssafy.hereboard.enumeration.EnumBoardStatus;
import com.ssafy.hereboard.enumeration.response.HereStatus;
import com.ssafy.hereboard.errorhandling.exception.service.BadRequestVariableException;
import com.ssafy.hereboard.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.hereboard.errorhandling.exception.service.NotAuthorizedUserException;
import com.ssafy.hereboard.repository.*;
import com.ssafy.hereboard.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final ResponseUtil responseUtil;
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    private final BoardImgRepository boardImgRepository;
    private final BoardMsgRepository boardMsgRepository;
    private final CheeringMsgRepository cheeringMsgRepository;
    private final BoardBdHistoryRepository boardBdHistoryRepository;

    /* 전체 게시글 조회 */
    public ResponseSuccessDto<List<BoardObjectDto>> getBoardList() {

        List<Board> boards = boardRepository.findBoardList();
        List<BoardObjectDto> result = new ArrayList<>();

        for (Board board : boards) {
            String thumbnail = findThumbnail(board.getId());
            BoardObjectDto boardObjectDto = BoardObjectDto.builder()
                    .boardId(board.getId())
                    .title(board.getTitle())
                    .nickname(board.getMember().getNickname())
                    .boardImgUrl(thumbnail)
                    .status(board.getStatus())
                    .dDay(board.getDeadline().atTime(LocalTime.MIDNIGHT))
                    .percentage(board.getCurQuantity() / board.getGoalQuantity() * 100)
                    .build();
            result.add(boardObjectDto);
        }

        ResponseSuccessDto<List<BoardObjectDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_BOARD);
        return res;
    }

    private String findThumbnail(Long boardId) {
        List<BoardImg> boardImgs = boardImgRepository.findAllByBoardId(boardId);

        if (boardImgs.size() > 0) {
            return boardImgs.get(0).getImgUrl();
        } else {
            return "/images/logo.svg";
        }
    }

    /* 내 게시글 조회 */
    public ResponseSuccessDto<List<BoardObjectDto>> getMyBoardList(UUID memberId) {

        List<Board> boards = boardRepository.findMyBoardList(memberId);

        List<BoardObjectDto> result = new ArrayList<>();

        for (Board board : boards) {
            String thumbnail = findThumbnail(board.getId());
            BoardObjectDto boardObjectDto = BoardObjectDto.builder()
                    .boardId(board.getId())
                    .title(board.getTitle())
                    .nickname(board.getMember().getNickname())
                    .boardImgUrl(thumbnail)
                    .status(board.getStatus())
                    .dDay(board.getDeadline().atTime(LocalTime.MIDNIGHT))
                    .percentage(board.getCurQuantity() / board.getGoalQuantity() * 100)
                    .build();
            result.add(boardObjectDto);
        }

        ResponseSuccessDto<List<BoardObjectDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_BOARD);
        return res;
    }

    /* 게시글 상세 조회 */
    public ResponseSuccessDto<GetBoardResponseDto> getBoard(Long boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new EntityIsNullException("해당 게시글이 존재하지 않습니다."));
        int curQ = board.getCurQuantity();
        int goalQ = board.getGoalQuantity();
        int percentage = curQ / goalQ * 100;

        List<BoardImg> boardImgs = boardImgRepository.findAllByBoardId(boardId);
        List<String> imgUrlList = new ArrayList<>();

        for (BoardImg boardImg : boardImgs) {
            imgUrlList.add(boardImg.getImgUrl());
        }

        GetBoardResponseDto getBoardResponseDto = GetBoardResponseDto.builder()
                .boardId(board.getId())
                .title(board.getTitle())
                .content(board.getContent())
                .deadline(board.getDeadline())
                .dDay(board.getDeadline().atTime(LocalTime.MIDNIGHT))
                .percentage(percentage)
                .curQuantity(board.getCurQuantity())
                .goalQuantity(board.getGoalQuantity())
                .createdDate(board.getCreatedDate())
                .boardImgUrlList(imgUrlList)
                .status(board.getStatus())
                .memberId(board.getMember().getId())
                .build();

        ResponseSuccessDto<GetBoardResponseDto> res = responseUtil.successResponse(getBoardResponseDto, HereStatus.HERE_FIND_BOARD_DETAIL);
        return res;
    }

    /* 게시글 생성 */
    public ResponseSuccessDto<SaveBoardResponseDto> save(SaveBoardRequestDto saveBoardRequestDto, List<String> imgUrlList) {
        Member member = memberRepository.findById(saveBoardRequestDto.getMemberId())
                .orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));
        Board board = new Board();
        board.createBoard(member, saveBoardRequestDto);
        boardRepository.save(board);

        if(imgUrlList.size() > 4) {
            throw new BadRequestVariableException("이미지는 4개 이하로 업로드해주세요!");
        }

        if(!imgUrlList.isEmpty()) {
            // 이미지 저장
            for (String img : imgUrlList) {
                BoardImg boardImg = new BoardImg();
                boardImg.createBoardImg(board, img);
                boardImgRepository.save(boardImg);
            }
        }

        SaveBoardResponseDto saveBoardResponseDto = SaveBoardResponseDto.builder()
                .boardId(board.getId())
                .message("게시글 등록 성공")
                .build();

        ResponseSuccessDto<SaveBoardResponseDto> res = responseUtil.successResponse(saveBoardResponseDto, HereStatus.HERE_WRITE_BOARD);
        return res;
    }

    /* 게시글 수정 */
    public ResponseSuccessDto<UpdateBoardResponseDto> updateBoard(UpdateBoardRequestDto updateBoardRequestDto, List<String> imgUrlList) {
        // 수정할 게시글 가져오기
        Board board = boardRepository.findById(updateBoardRequestDto.getBoardId())
                .orElseThrow(() -> new EntityIsNullException("해당 게시글이 없습니다."));

        checkAuthorizationToUpdateBoard(updateBoardRequestDto.getWriterId(), board);

        if(imgUrlList.size() > 4) {
            throw new BadRequestVariableException("이미지는 4개 이하로 업로드해주세요!");
        }

        // 게시글의 title, content 수정
        board.updateBoard(updateBoardRequestDto, board);

        // 해당 게시글의 기존 이미지 리스트를 db에서 삭제
        List<BoardImg> boardImgs = boardImgRepository.findAllByBoardId(updateBoardRequestDto.getBoardId());

        boardImgRepository.deleteAll(boardImgs);

        // 새롭게 들어온 이미지 리스트로 db에 추가
        for (String img : imgUrlList) {
            BoardImg boardImg = new BoardImg();
            boardImg.createBoardImg(board, img);
            boardImgRepository.save(boardImg);
        }
        UpdateBoardResponseDto updateBoardResponseDto = UpdateBoardResponseDto.builder()
                .boardId(board.getId())
                .message("게시글 수정 성공")
                .build();

        ResponseSuccessDto<UpdateBoardResponseDto> res = responseUtil.successResponse(updateBoardResponseDto, HereStatus.HERE_UPDATE_BOARD);
        return res;
    }

    /* 게시글 업데이트 권한 확인 */
    private static void checkAuthorizationToUpdateBoard(UUID writerId, Board board) {
        if(!board.getMember().getId().equals(writerId)) {
            throw new NotAuthorizedUserException("수정 권한이 없는 회원입니다.");
        }
    }

    /* 게시글 삭제/마감 */
    public ResponseSuccessDto<UpdateBoardStatusResponseDto> updateBoardStatus(UpdateBoardStatusRequestDto updateBoardStatusRequestDto) {
        if (updateBoardStatusRequestDto.getStatus() == EnumBoardStatus.ACTIVE) {
            throw new BadRequestVariableException("게시글 상태값 요청이 올바르지 않습니다.");
        }

        // 삭제할 게시글 가져오기
        Board board = boardRepository.findById(updateBoardStatusRequestDto.getBoardId())
                .orElseThrow(() -> new EntityIsNullException("해당 게시글이 없습니다."));

        checkAuthorizationToUpdateBoard(updateBoardStatusRequestDto.getWriterId(), board);

        // 해당 게시글을 status를 프론트에서 준 status로 변경
        board.updateBoardStatus(updateBoardStatusRequestDto.getStatus());

        String message = "";
        HereStatus hereStatus = null;

        if (updateBoardStatusRequestDto.getStatus() == EnumBoardStatus.INACTIVE) {
            message = "게시글 마감 성공";
            hereStatus = HereStatus.HERE_CLOSE_BOARD;
        } else {
            message = "게시글 삭제 성공";
            hereStatus = HereStatus.HERE_DELETE_BOARD;
        }
        UpdateBoardStatusResponseDto updateBoardStatusResponseDto = UpdateBoardStatusResponseDto.builder()
                .boardId(updateBoardStatusRequestDto.getBoardId())
                .message(message)
                .build();

        ResponseSuccessDto<UpdateBoardStatusResponseDto> res = responseUtil.successResponse(updateBoardStatusResponseDto, hereStatus);
        return res;
    }

    /* 응원 메시지 수정 */
    public ResponseSuccessDto<UpdateMsgResponseDto> updateMsg(UpdateMsgRequestDto updateMsgRequestDto) {

        // 해당하는 멤버가 이 board의 cheeringMsg를 누른 적 있는지 확인
        Long boardId = updateMsgRequestDto.getBoardId();
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 게시글입니다."));

        UUID memberId = updateMsgRequestDto.getMemberId();

        Long cheeringMsgId = updateMsgRequestDto.getCheeringMsgId();

        // 해당 조합 게시글메시지 객체 찾기!
        Optional<BoardMsg> boardCheeringMsg = boardMsgRepository.findByBoardAndMemberIdAndMsgId(board, memberId, cheeringMsgId);

        // 만약 아예 db에 게시글메시지 객체가 없으면 insert, 아니면 update
        if (boardCheeringMsg.isEmpty()) {
            BoardMsg boardMsg = new BoardMsg();
            boardMsg.createBoardMsg(board, memberId, cheeringMsgId);
            boardMsgRepository.save(boardMsg);
            boardMsgRepository.flush();
        } else {
            boardCheeringMsg.get().updateBoardMsg(boardCheeringMsg.get().getStatus());
        }

        // ACTIVE 메시지 개수 세기
        List<BoardMsg> cheeringMsgs = boardMsgRepository.findAllByBoardAndCheeringMsgIdAndStatusActive(board, cheeringMsgId);
        int count = cheeringMsgs.size();
        // 있으면? -> -1 / 없으면? -> + 1 count 해주고 그걸 테이블에 반영
        // count한 결과 resposne에 담기
        UpdateMsgResponseDto updateMsgResponseDto = UpdateMsgResponseDto.builder()
                .cnt(count)
                .build();

        ResponseSuccessDto<UpdateMsgResponseDto> res = responseUtil.successResponse(updateMsgResponseDto, HereStatus.HERE_UPDATE_CHEERING_MSG_CNT);
        return res;
    }

    /* 응원 메시지별 카운트 조회 */
    public ResponseSuccessDto<List<GetBoardMsgResponseDto>> getBoardMsgList(Long boardId, UUID memberId) {

        // 댓글 목록 가져올 주인공 게시글 가져오기
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new EntityIsNullException("해당 게시글이 없습니다."));

        List<CheeringMsg> cheeringMsgList = cheeringMsgRepository.findAll();
        List<GetBoardMsgResponseDto> result = new ArrayList<>();

        for (CheeringMsg cheeringMsg : cheeringMsgList) {
            Long cheeringMsgId = cheeringMsg.getId();
            String content = cheeringMsg.getContent();
            Boolean isSelected = false;

            List<BoardMsg> boardMsgList = boardMsgRepository.findAllByBoardAndCheeringMsgIdAndStatusActive(board, cheeringMsgId);
            int cnt = boardMsgList.size();
            Optional<BoardMsg> boardMsg = boardMsgRepository.findByBoardAndCheeringMsgIdAndMemberIdAndStatus(board, cheeringMsgId, memberId, EnumBoardMsgStatus.ACTIVE);

            if (!boardMsg.isEmpty()) {
                isSelected = true;
            }

            GetBoardMsgResponseDto getBoardMsgResponseDto = GetBoardMsgResponseDto.builder()
                    .cheeringMsgId(cheeringMsgId)
                    .content(content)
                    .cnt(cnt)
                    .isSelected(isSelected)
                    .build();
            result.add(getBoardMsgResponseDto);
        }
        ResponseSuccessDto<List<GetBoardMsgResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_CHEERING_MSG);
        return res;
    }

    /* 게시글 검색 */
    public ResponseSuccessDto<List<SearchBoardResponseDto>> searchBoard(String query) {
        List<Board> searchedList = boardRepository.searchBoard(query);
        List<SearchBoardResponseDto> result = new ArrayList<>();

        for (Board searched : searchedList) {
            String thumbnail = findThumbnail(searched.getId());

            int curQ = searched.getCurQuantity();
            int goalQ = searched.getGoalQuantity();
            int percentage = curQ / goalQ * 100;

            SearchBoardResponseDto searchBoardResponseDto = SearchBoardResponseDto.builder()
                    .boardId(searched.getId())
                    .title(searched.getTitle())
                    .nickname(searched.getMember().getNickname())
                    .boardImgUrl(thumbnail)
                    .status(searched.getStatus())
                    .dDay(searched.getDeadline().atTime(LocalTime.MIDNIGHT))
                    .percentage(percentage)
                    .build();
            result.add(searchBoardResponseDto);
        }
        ResponseSuccessDto<List<SearchBoardResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_BOARD);
        return res;
    }

    /* 종료 임박 게시글 목록 조회 */
    public ResponseSuccessDto<List<BoardObjectDto>> getDeadlineBoardList() {

        List<Board> boards = boardRepository.findTop4ByStatusOrderByDeadlineAscCurQuantityAsc(EnumBoardStatus.ACTIVE);
        List<BoardObjectDto> result = new ArrayList<>();

        for (Board board : boards) {
            String thumbnail = findThumbnail(board.getId());
            BoardObjectDto boardObjectDto = BoardObjectDto.builder()
                    .boardId(board.getId())
                    .title(board.getTitle())
                    .nickname(board.getMember().getNickname())
                    .boardImgUrl(thumbnail)
                    .status(board.getStatus())
                    .dDay(board.getDeadline().atTime(LocalTime.MIDNIGHT))
                    .percentage(board.getCurQuantity() / board.getGoalQuantity() * 100)
                    .build();
            result.add(boardObjectDto);
        }

        ResponseSuccessDto<List<BoardObjectDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_BOARD);
        return res;
    }

    /* 기부 내역 등록 */
    public ResponseSuccessDto<UpdateBoardBdHistoryResponseDto> updateBoardBdHistory(UpdateBoardBdHistoryRequestDto updateBoardBdHistoryRequestDto) {

        Long boardId = updateBoardBdHistoryRequestDto.getBoardId();
        UUID senderId = updateBoardBdHistoryRequestDto.getSenderId();

        BoardBdHistory subjectBoardBdHistory = boardBdHistoryRepository.findByBoardIdAndSenderId(boardId, senderId); // 없으면 null이 나옴

        if (subjectBoardBdHistory == null) {
            // 이 게시글에 아직 기부한 적 없는 사람
            BoardBdHistory boardBdHistory = new BoardBdHistory();
            boardBdHistory.createBoardBdHistory(updateBoardBdHistoryRequestDto);
            boardBdHistoryRepository.save(boardBdHistory);
        } else {
            int newQuantity = subjectBoardBdHistory.getQuantity() + updateBoardBdHistoryRequestDto.getQuantity();
            subjectBoardBdHistory.updateBoardBdHistory(newQuantity);
        }
        UpdateBoardBdHistoryResponseDto updateBoardBdHistoryResponseDto = UpdateBoardBdHistoryResponseDto.builder()
                .message("기부리스트 등록 성공")
                .build();

        ResponseSuccessDto<UpdateBoardBdHistoryResponseDto> res = responseUtil.successResponse(updateBoardBdHistoryResponseDto, HereStatus.HERE_CREATE_DONATION);
        return res;
    }

    /* 기부 해시값 총 개수 확인 */


    /* 기부 해시값 조회(자동 선택) */
    public ResponseSuccessDto<List<GetBoardBdHistoryResponseDto>> getBoardBdHistory(UUID senderId, int quantity) {

//        ResponseSuccessDto<List<SearchBoardResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_BOARD);
//        return res;
        return null;
    }

//    public ResponseSuccessDto<Page<Board>> getBoardListPaging(Pageable pageable) {
//        Page<Board> boardListPaging = boardRepository.findBoardListPaging(pageable);
//
//
//        ResponseSuccessDto<Page<Board>> res = responseUtil.successResponse(boardListPaging, HereStatus.HERE_FIND_BOARD);
//        return res;
//    }

    /* 전체 게시글 조회(페이징) */
    public ResponseSuccessDto<Page<BoardResponseDto>> getBoardListPaging(Pageable pageable) {
        Page<Board> boardPage = boardRepository.findBoardListPaging(pageable);
        List<Board> boardList = boardPage.getContent();

        List<BoardResponseDto> boardResponseDtoList = boardList.stream()
                .map(board -> BoardResponseDto.builder()
                        .boardId(board.getId())
                        .title(board.getTitle())
                        .nickname(board.getMember().getNickname())
                        .boardImgUrl(findThumbnail(board.getId()))
                        .status(board.getStatus())
                        .dDay(board.getDeadline().atTime(LocalTime.MIDNIGHT))
                        .percentage(board.getCurQuantity() / board.getGoalQuantity() * 100)
                        .build())
                .collect(Collectors.toList());

        Page<BoardResponseDto> boardResponseDtoPage = new PageImpl<>(boardResponseDtoList, pageable, boardPage.getTotalElements());
        return responseUtil.successResponse(boardResponseDtoPage, HereStatus.HERE_FIND_BOARD);
    }
    /* 내 게시글 조회(페이징) */
    public ResponseSuccessDto<Page<BoardResponseDto>> getMemberBoardListPaging(UUID memberId, Pageable pageable) {

        Page<Board> boardPage = boardRepository.findMyBoardListPaging(memberId,pageable);
        List<Board> boardList = boardPage.getContent();

        List<BoardResponseDto> boardResponseDtoList = boardList.stream()
                .map(board -> BoardResponseDto.builder()
                        .boardId(board.getId())
                        .title(board.getTitle())
                        .nickname(board.getMember().getNickname())
                        .boardImgUrl(findThumbnail(board.getId()))
                        .status(board.getStatus())
                        .dDay(board.getDeadline().atTime(LocalTime.MIDNIGHT))
                        .percentage(board.getCurQuantity() / board.getGoalQuantity() * 100)
                        .build())
                .collect(Collectors.toList());

        Page<BoardResponseDto> boardResponseDtoPage = new PageImpl<>(boardResponseDtoList, pageable, boardPage.getTotalElements());
        return responseUtil.successResponse(boardResponseDtoPage, HereStatus.HERE_FIND_BOARD);
    }


    /* 게시글 검색(페이징) */
    public ResponseSuccessDto<Page<SearchBoardResponseDto>> searchBoardPaging(String query, Pageable pageable) {
        Page<Board> searchedPage = boardRepository.searchBoardPaging(query,pageable);
        List<Board> searchedList = searchedPage.getContent();

        List<SearchBoardResponseDto> searchBoardResponseDtoList = searchedList.stream()
                .map(board -> SearchBoardResponseDto.builder()
                        .boardId(board.getId())
                        .title(board.getTitle())
                        .nickname(board.getMember().getNickname())
                        .boardImgUrl(findThumbnail(board.getId()))
                        .status(board.getStatus())
                        .dDay(board.getDeadline().atTime(LocalTime.MIDNIGHT))
                        .percentage(board.getCurQuantity() / board.getGoalQuantity() * 100)
                        .build())
                .collect(Collectors.toList());

        Page<SearchBoardResponseDto> searchBoardResponseDtoPage = new PageImpl<>(searchBoardResponseDtoList, pageable, searchedPage.getTotalElements());
        return responseUtil.successResponse(searchBoardResponseDtoPage, HereStatus.HERE_FIND_BOARD);
    }
}
