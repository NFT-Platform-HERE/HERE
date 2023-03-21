package com.ssafy.hereboard.service;

import com.ssafy.hereboard.dto.board.*;
import com.ssafy.hereboard.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereboard.entity.*;
import com.ssafy.hereboard.enumeration.EnumBoardStatus;
import com.ssafy.hereboard.enumeration.response.HereStatus;
import com.ssafy.hereboard.errorhandling.exception.service.BadRequestVariableException;
import com.ssafy.hereboard.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.hereboard.repository.*;
import com.ssafy.hereboard.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public ResponseSuccessDto<List<BoardResponseDto>> getBoardList() {

        List<Board> boards = boardRepository.findAllByStatusOrderByCreatedDateAsc();
//        List<BoardResponseDto> boardList = boards.stream()
//                .map(b -> new BoardResponseDto(b))
//                .collect(Collectors.toList());
        List<BoardResponseDto> result = new ArrayList<>();

        for (Board board : boards) {
            String thumbnail = findThumbnail(board.getId());
            BoardResponseDto boardResponseDto = BoardResponseDto.builder()
                    .boardId(board.getId())
                    .title(board.getTitle())
                    .nickname(board.getMember().getNickname())
                    .boardImgUrl(thumbnail)
                    .status(board.getStatus())
                    .dDay(board.getDeadline())
                    .percentage(board.getCurQuantity() / board.getGoalQuantity() * 100)
                    .build();
            result.add(boardResponseDto);
        }

        ResponseSuccessDto<List<BoardResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_BOARD);
        return res;
    }

    private String findThumbnail(Long boardId) {
        List<BoardImg> boardImgs = boardImgRepository.findAllByBoardId(boardId);

        if (boardImgs.size() > 0) {
            return boardImgs.get(0).getImgUrl();
        } else {
            return "noThumbnail";
        }
    }

    /* 내 게시글 조회 */
    public ResponseSuccessDto<List<BoardResponseDto>> getMemberBoardList(UUID memberId) {

        List<Board> boards = boardRepository.findMineAllByStatusOrderByCreatedDateAsc(memberId);

        List<BoardResponseDto> result = new ArrayList<>();

        for (Board board : boards) {
            String thumbnail = findThumbnail(board.getId());
            BoardResponseDto boardResponseDto = BoardResponseDto.builder()
                    .boardId(board.getId())
                    .title(board.getTitle())
                    .nickname(board.getMember().getNickname())
                    .boardImgUrl(thumbnail)
                    .status(board.getStatus())
                    .dDay(board.getDeadline())
                    .percentage(board.getCurQuantity() / board.getGoalQuantity() * 100)
                    .build();
            result.add(boardResponseDto);
        }

        ResponseSuccessDto<List<BoardResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_BOARD);
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
//        List<String> imgUrlList = boardImgs.stream()
//                        .map(BoardImg::getImgUrl)
//                                .collect(Collectors.toList());
        List<String> imgUrlList = new ArrayList<>();
        for (BoardImg boardImg : boardImgs) {
            imgUrlList.add(boardImg.getImgUrl());
        }

        GetBoardResponseDto getBoardResponseDto = GetBoardResponseDto.builder()
                .boardId(board.getId())
                .title(board.getTitle())
                .content(board.getContent())
                .deadline(board.getDeadline())
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
    public ResponseSuccessDto<SaveBoardResponseDto> save(SaveBoardRequestDto saveBoardRequestDto) {
        Member member = memberRepository.findById(saveBoardRequestDto.getMemberId())
                .orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));
        Board board = new Board().createBoard(member, saveBoardRequestDto);
        boardRepository.save(board);

        // 이미지 리스트 넣어주기
        for (String img : saveBoardRequestDto.getImgUrlList()) {
            BoardImg boardImg = new BoardImg().createBoardImg(board, img);
            boardImgRepository.save(boardImg);
        }

        SaveBoardResponseDto saveBoardResponseDto = SaveBoardResponseDto.builder()
                .boardId(board.getId())
                .message("게시글 등록 성공")
                .build();

        ResponseSuccessDto<SaveBoardResponseDto> res = responseUtil.successResponse(saveBoardResponseDto, HereStatus.HERE_WRITE_BOARD);
        return res;
    }

    /* 게시글 수정 */
    public ResponseSuccessDto<UpdateBoardResponseDto> updateBoard(UpdateBoardRequestDto updateBoardRequestDto) {
        // 수정할 게시글 가져오기
        Board board = boardRepository.findById(updateBoardRequestDto.getBoardId())
                .orElseThrow(() -> new EntityIsNullException("해당 게시글이 없습니다."));
        // 게시글의 title, content 수정
        board.updateBoard(board, updateBoardRequestDto); // 굳이 board를 넣어줄 필요가...?

        // 해당 게시글의 기존 이미지 리스트를 db에서 삭제
        List<BoardImg> boardImgs = boardImgRepository.findAllByBoardId(updateBoardRequestDto.getBoardId());

        for (BoardImg boardImg : boardImgs) {
            boardImgRepository.delete(boardImg);
        }

        // 새롭게 들어온 이미지 리스트로 db에 추가
        for (String img : updateBoardRequestDto.getImgUrlList()) {
            BoardImg boardImg = new BoardImg().createBoardImg(board, img);
            boardImgRepository.save(boardImg);
        }
        UpdateBoardResponseDto updateBoardResponseDto = UpdateBoardResponseDto.builder()
                .boardId(board.getId())
                .message("게시글 수정 성공")
                .build();

        ResponseSuccessDto<UpdateBoardResponseDto> res = responseUtil.successResponse(updateBoardResponseDto, HereStatus.HERE_UPDATE_BOARD);
        return res;
    }

    /* 게시글 삭제/마감 */
    public ResponseSuccessDto<UpdateBoardStatusResponseDto> updateBoardStatus(Long boardId, EnumBoardStatus status) {
        if (status.equals(EnumBoardStatus.ACTIVE)) {
            throw new BadRequestVariableException("게시글 상태값 요청이 올바르지 않습니다.");
        }
        // 삭제할 게시글 가져오기
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new EntityIsNullException("해당 게시글이 없습니다."));

        // 해당 게시글을 status를 프론트에서 준 status로 변경
        board.updateBoardStatus(status);

        String message = "";
        HereStatus hereStatus = null;

        if (status == EnumBoardStatus.INACTIVE) {
            message = "게시글 마감 성공";
            hereStatus = HereStatus.HERE_CLOSE_BOARD;
        } else {
            message = "게시글 삭제 성공";
            hereStatus = HereStatus.HERE_DELETE_BOARD;
        }
        UpdateBoardStatusResponseDto updateBoardStatusResponseDto = UpdateBoardStatusResponseDto.builder()
                .boardId(boardId)
                .message(message)
                .build();

        ResponseSuccessDto<UpdateBoardStatusResponseDto> res = responseUtil.successResponse(updateBoardStatusResponseDto, hereStatus);
        return res;
    }

//    /* 게시글 마감 */
//    public ResponseSuccessDto<CloseBoardResponseDto> closeBoard(Long boardId) {
//        // 마감할 게시글 가져오기
//        Board board = boardRepository.findById(boardId)
//                .orElseThrow(() -> new EntityIsNullException("해당 게시글이 없습니다."));
//
////        if (board.getStatus() == EnumBoardStatus.DELETE) {
////        } 이런 작업은 안 필요한가요? 그리고 삭제, 마감) 실제 작성자인지 확인하는 로직은 어디 넣는 게 적합?
//
//        // 해당 게시글을 status를 INACTIVE로 변경
//        board.closeBoard();
//
//        CloseBoardResponseDto closeBoardResponseDto = CloseBoardResponseDto.builder()
//                .boardId(board.getId())
//                .message("게시글 마감 성공")
//                .build();
//
//        ResponseSuccessDto<CloseBoardResponseDto> res = responseUtil.successResponse(closeBoardResponseDto, HereStatus.HERE_CLOSE_BOARD);
//        return res;
//    }

    /* 응원 메시지 수정 */
    public ResponseSuccessDto<UpdateMsgResponseDto> updateMsg(UpdateMsgRequestDto updateMsgRequestDto) {
        // 일단 request로 들어온 memberId에 해당하는 멤버가 이 board의 cheeringMsg를 누른 적 있는지 확인
        Long boardId = updateMsgRequestDto.getBoardId();
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 게시글입니다."));

        UUID memberId = updateMsgRequestDto.getMemberId();

        Long cheeringMsgId = updateMsgRequestDto.getCheeringMsgId();

        // 리포로 가서 해당 조합 게시글메시지 객체 찾기!

        Optional<BoardMsg> boardCheeringMsg = boardMsgRepository.findByBoardAndMemberIdAndMsgId(board, memberId, cheeringMsgId);
        System.out.println("객체 찾기 완료!");

        // 만약 아예 db에 게시글메시지 객체가 없으면 insert, 아니면 update
        if (boardCheeringMsg.isEmpty()) {
            BoardMsg boardMsg = new BoardMsg();
            boardMsg.createBoardMsg(board, memberId, cheeringMsgId);
            System.out.println("db에 없을 때 createBoardMsg 완료!");
            boardMsgRepository.save(boardMsg);
            boardMsgRepository.flush();
            System.out.println("db에 없을 때 리포에 save 완료!");

        } else {
            boardCheeringMsg.get().updateBoardMsg(boardCheeringMsg.get().getStatus());
            System.out.println("db에 있을 때, updateBoardMsg 환료!");
        }

        // 리포에서 ACTIVE인 애들 개수 세기
        List<BoardMsg> cheeringMsgs = boardMsgRepository.findAllByBoardAndCheeringMsgIdAndStatusActive(board, cheeringMsgId);
        int count = cheeringMsgs.size();
        System.out.println("해당 board에서의 cherringMsgs 개수 세기 완료!");

//        // 있으면? -> -1 / 없으면? -> + 1 count 해주고 그걸 테이블에 반영
//        // count한 결과를 resposne로 주기
//
        UpdateMsgResponseDto updateMsgResponseDto = UpdateMsgResponseDto.builder()
                .cnt(count)
                .build();

        ResponseSuccessDto<UpdateMsgResponseDto> res = responseUtil.successResponse(updateMsgResponseDto, HereStatus.HERE_UPDATE_CHEERING_MSG_CNT);
        return res;
    }

    /* 응원 메시지별 카운트 조회 */
    public ResponseSuccessDto<List<GetBoardMsgResponseDto>> getBoardMsgList(Long boardId) {

        // 댓글 목록 가져올 주인공 게시글 가져오기
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new EntityIsNullException("해당 게시글이 없습니다."));

//        List<BoardMsg> boardMsgs = boardMsgRepository.findAllByBoard(board);
//        System.out.println("리스트 확인" + boardMsgs);
//
//        List<?> test = boardMsgRepository.findAllByBoardGroupByCheeringMsgId(board);
//        System.out.println("테스트" + test);
        List<CheeringMsg> cheeringMsgList = cheeringMsgRepository.findAll();
        List<GetBoardMsgResponseDto> result = new ArrayList<>();

        for (CheeringMsg cheeringMsg : cheeringMsgList) {
            Long cheeringMsgId = cheeringMsg.getId();
            String content = cheeringMsg.getContent();

            // cnt를 위해서 리포지토리에 접근!
            int cnt = boardMsgRepository.findCountByBoardAndCheeringMsgId(board, cheeringMsgId);

            GetBoardMsgResponseDto getBoardMsgResponseDto = GetBoardMsgResponseDto.builder()
                    .cheeringMsgId(cheeringMsgId)
                    .content(content)
                    .cnt(cnt)
                    .build();
            result.add(getBoardMsgResponseDto);
        }
        ResponseSuccessDto<List<GetBoardMsgResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_CHEERING_MSG);
        return res;
    }

    /* 게시글 검색 */
    public ResponseSuccessDto<List<SearchBoardResponseDto>> searchBoard(String query) {
        List<Board> searchedList = boardRepository.findAllBySearch(query);
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
                    .dDay(searched.getDeadline())
                    .percentage(percentage)
                    .build();
            result.add(searchBoardResponseDto);
        }
        ResponseSuccessDto<List<SearchBoardResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_BOARD);
        return res;
    }

    /* 종료 임박 게시글 목록 조회 */

    /* 기부 내역 등록 */
    public ResponseSuccessDto<UpdateBoardBdHistoryResponseDto> updateBoardBdHistory(UpdateBoardBdHistoryRequestDto updateBoardBdHistoryRequestDto) {

        // 지금 기부하려는 게시글 보고!
        Long boardId = updateBoardBdHistoryRequestDto.getBoardId();
        UUID senderId = updateBoardBdHistoryRequestDto.getSenderId();
        // 주인공 boardBdHistory 가져오자
        BoardBdHistory subjectBoardBdHistory = boardBdHistoryRepository.findByBoardIdAndSenderId(boardId, senderId); // 없으면 null이 나옴

        System.out.println("찾았다 주인공" + subjectBoardBdHistory);

//        // sender가 이미 여기에 기부했던 적 있는지 확인!
//        // 지금 이 게시글에 기부했다고 등록된 boardBdHistory 다 가져오자
//        List<String> donators = boardBdHistoryRepository.findAllSenderIdByBoardId(boardId);
//        System.out.println("확인" + donators);
//        System.out.println("이것" + updateBoardBdHistoryRequestDto.getSenderId());
//
//        boolean isDonate = false;
//
//        for (String donator : donators) {
//            if (updateBoardBdHistoryRequestDto.getSenderId().toString().equals(donator)) {
//                isDonate = true;
//            }
//        }
//        System.out.println("이 사람이 이미 기부자 목록에 있나요?" + isDonate);

        if (subjectBoardBdHistory == null) {
            // 이 게시글에 아직 기부한 적 없는 사람
            BoardBdHistory boardBdHistory = new BoardBdHistory().createBoardBdHistory(updateBoardBdHistoryRequestDto);
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

    /* 기부 데이터 조회 */
    public ResponseSuccessDto<List<GetBoardBdHistoryResponseDto>> getBoardBdHistory(UUID senderId, int quantity) {

//        ResponseSuccessDto<List<SearchBoardResponseDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_BOARD);
//        return res;
        return null;
    }

}
