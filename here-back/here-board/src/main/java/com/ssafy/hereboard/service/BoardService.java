package com.ssafy.hereboard.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.ssafy.hereboard.dto.board.*;
import com.ssafy.hereboard.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereboard.entity.*;
import com.ssafy.hereboard.enumeration.EnumBoardImgStatus;
import com.ssafy.hereboard.enumeration.EnumBoardMsgStatus;
import com.ssafy.hereboard.enumeration.EnumBoardStatus;
import com.ssafy.hereboard.enumeration.EnumNotificationCode;
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
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

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
    private final BoardBdHistoryRepository boardBdHistoryRepository;
    private final CheeringMsgRepository cheeringMsgRepository;
    private final RestTemplate restTemplate;

    /* 게시글 상세 조회 */
    public ResponseSuccessDto<GetBoardResponseDto> getBoard(Long boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new EntityIsNullException("해당 게시글이 존재하지 않습니다."));
        int curQ = board.getCurQuantity();
        int goalQ = board.getGoalQuantity();
        int percentage = curQ * 100 / goalQ;

        List<BoardImg> boardImgs = boardImgRepository.findAllByBoardIdAndStatusOrderByOrders(boardId, EnumBoardImgStatus.ACTIVE);
        List<GetBoardImgResponseDto> boardImgUrlList = new ArrayList<>();
        for (BoardImg boardImg : boardImgs) {
            boardImgUrlList.add(GetBoardImgResponseDto.builder()
                            .boardImgId(boardImg.getId())
                            .imgUrl(boardImg.getImgUrl())
                            .build());
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
                .boardImgUrlList(boardImgUrlList)
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

        String content = saveBoardRequestDto.getContent();
        if(content.length() >= 1000) {
            throw new BadRequestVariableException("게시글을 1000자 이하로 작성해주세요!");
        }

        Board board = new Board();
        board.createBoard(member, saveBoardRequestDto);
        boardRepository.save(board);

        if(imgUrlList.size() > 4) {
            throw new BadRequestVariableException("이미지는 4개 이하로 업로드해주세요!");
        }

        if(!imgUrlList.isEmpty()) {
            // 이미지 저장
            for(int i=0; i< imgUrlList.size(); i++) {
                BoardImg boardImg = new BoardImg();
                boardImg.createBoardImg(board, imgUrlList.get(i), i);
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
    public ResponseSuccessDto<UpdateBoardResponseDto> updateBoard(
            UpdateBoardRequestDto updateBoardRequestDto,
            List<UpdateBoardImgObject> updateBoardImgObjectList,
            List<String> imgUrlList,
            List<Integer> ordersList) {
        // 수정할 게시글 가져오기
        Board board = boardRepository.findById(updateBoardRequestDto.getBoardId())
                .orElseThrow(() -> new EntityIsNullException("해당 게시글이 없습니다."));

        checkAuthorizationToUpdateBoard(updateBoardRequestDto.getWriterId(), board);

        if(imgUrlList.size() > 4) {
            throw new BadRequestVariableException("이미지는 4개 이하로 업로드해주세요!");
        }

        // 1) 게시글의 title, content 수정
        board.updateBoard(updateBoardRequestDto, board);

        List<BoardImg> boardImgList = boardImgRepository.findAllByBoardIdAndStatusOrderByOrders(board.getId(), EnumBoardImgStatus.ACTIVE);
        for (BoardImg boardImg : boardImgList) {
            boolean flag = false;

            for (UpdateBoardImgObject updateBoardImgObject : updateBoardImgObjectList) {
                if(updateBoardImgObject.getBoardImgId().equals(boardImg.getId())) {
                    boardImg.updateBoardImg(EnumBoardImgStatus.ACTIVE, updateBoardImgObject.getOrders());
                    flag = true;
                    break;
                }
            }

            if(!flag) {
                boardImg.updateBoardImg(EnumBoardImgStatus.INACTIVE, 0);
            }
        }

        // 3) 4) 새롭게 들어온 이미지 추가(url, order)
        for(int i=0; i<imgUrlList.size(); i++) {
            BoardImg boardImg = new BoardImg();
            boardImg.createBoardImg(board, imgUrlList.get(i), ordersList.get(i));
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

            List<BoardBdHistory> boardBdHistoryList = boardBdHistoryRepository.findAllByBoardId(board.getId());
            for (BoardBdHistory boardBdHistory : boardBdHistoryList) {
                Member sender = board.getMember();
                Member receiver = memberRepository.findById(boardBdHistory.getSenderId()).orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));
                postNotification(sender, receiver, EnumNotificationCode.CLOSED, 0L);
            }

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
        // 일단 request로 들어온 memberId에 해당하는 멤버가 이 board의 cheeringMsg를 누른 적 있는지 확인
        Long boardId = updateMsgRequestDto.getBoardId();
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new EntityIsNullException("존재하지 않는 게시글입니다."));

        UUID memberId = updateMsgRequestDto.getMemberId();

        Long cheeringMsgId = updateMsgRequestDto.getCheeringMsgId();

        // 리포로 가서 해당 조합 게시글메시지 객체 찾기!

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

        // 리포에서 ACTIVE인 애들 개수 세기
        List<BoardMsg> cheeringMsgs = boardMsgRepository.findAllByBoardAndCheeringMsgIdAndStatusActive(board, cheeringMsgId);
        int count = cheeringMsgs.size();

        // 있으면? -> -1 / 없으면? -> + 1 count 해주고 그걸 테이블에 반영
        // count한 결과를 resposne로 주기
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

            // cnt를 위해서 리포지토리에 접근!
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
                    .percentage(board.getCurQuantity() * 100 / board.getGoalQuantity())
                    .build();
            result.add(boardObjectDto);
        }

        ResponseSuccessDto<List<BoardObjectDto>> res = responseUtil.successResponse(result, HereStatus.HERE_FIND_BOARD);
        return res;
    }

    /* 전체 게시글 조회(페이징) */
    public ResponseSuccessDto<Page<BoardObjectDto>> getBoardListPaging(Pageable pageable) {
        Page<Board> boardPage = boardRepository.findBoardListPaging(pageable);
        List<Board> boardList = boardPage.getContent();

        List<BoardObjectDto> boardResponseDtoList = boardList.stream()
                .map(board -> BoardObjectDto.builder()
                        .boardId(board.getId())
                        .title(board.getTitle())
                        .nickname(board.getMember().getNickname())
                        .boardImgUrl(findThumbnail(board.getId()))
                        .status(board.getStatus())
                        .dDay(board.getDeadline().atTime(LocalTime.MIDNIGHT))
                        .percentage(board.getCurQuantity() * 100 / board.getGoalQuantity())
                        .build())
                .collect(Collectors.toList());

        Page<BoardObjectDto> boardResponseDtoPage = new PageImpl<>(boardResponseDtoList, pageable, boardPage.getTotalElements());
        return responseUtil.successResponse(boardResponseDtoPage, HereStatus.HERE_FIND_BOARD);
    }
    /* 내 게시글 조회(페이징) */
    public ResponseSuccessDto<Page<BoardObjectDto>> getMemberBoardListPaging(UUID memberId, Pageable pageable) {

        Page<Board> boardPage = boardRepository.findMyBoardListPaging(memberId,pageable);
        List<Board> boardList = boardPage.getContent();

        List<BoardObjectDto> boardResponseDtoList = boardList.stream()
                .map(board -> BoardObjectDto.builder()
                        .boardId(board.getId())
                        .title(board.getTitle())
                        .nickname(board.getMember().getNickname())
                        .boardImgUrl(findThumbnail(board.getId()))
                        .status(board.getStatus())
                        .dDay(board.getDeadline().atTime(LocalTime.MIDNIGHT))
                        .percentage(board.getCurQuantity() * 100 / board.getGoalQuantity())
                        .build())
                .collect(Collectors.toList());

        Page<BoardObjectDto> boardResponseDtoPage = new PageImpl<>(boardResponseDtoList, pageable, boardPage.getTotalElements());
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
                        .percentage(board.getCurQuantity() * 100 / board.getGoalQuantity())
                        .build())
                .collect(Collectors.toList());

        Page<SearchBoardResponseDto> searchBoardResponseDtoPage = new PageImpl<>(searchBoardResponseDtoList, pageable, searchedPage.getTotalElements());
        return responseUtil.successResponse(searchBoardResponseDtoPage, HereStatus.HERE_FIND_BOARD);
    }

    private String findThumbnail(Long boardId) {
        List<BoardImg> boardImgs = boardImgRepository.findAllByBoardIdAndStatusOrderByOrders(boardId, EnumBoardImgStatus.ACTIVE);

        if (boardImgs.size() > 0) {
            return boardImgs.get(0).getImgUrl();
        } else {
            return "/images/logo.svg";
        }
    }

    private static void checkAuthorizationToUpdateBoard(UUID writerId, Board board) {
        if(!board.getMember().getId().equals(writerId)) {
            throw new NotAuthorizedUserException("수정 권한이 없는 회원입니다.");
        }
    }

    private void postNotification(Member sender, Member receiver, EnumNotificationCode code, Long nftId) {
        ObjectNode jsonNodes = JsonNodeFactory.instance.objectNode();
        String message = receiver.getNickname() + "님께서 기부하신 " + sender.getNickname() + "님의 게시글이 마감되었습니다.";
        jsonNodes.put("content", message);
        jsonNodes.put("receiverId", receiver.getId().toString());
        jsonNodes.put("senderId", sender.getId().toString());
        jsonNodes.put("code", code.toString());
        jsonNodes.put("nftId", nftId);

        ResponseEntity<JsonNode> postResult = restTemplate.postForEntity(
                "https://j8b209.p.ssafy.io:9013/api/notification",
                jsonNodes,
                JsonNode.class
        );
    }
}
