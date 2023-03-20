package com.ssafy.hereboard.service;

import com.ssafy.hereboard.dto.board.SaveBoardRequestDto;
import com.ssafy.hereboard.dto.board.SaveBoardResponseDto;
import com.ssafy.hereboard.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereboard.entity.Board;
import com.ssafy.hereboard.entity.BoardImg;
import com.ssafy.hereboard.entity.Member;
import com.ssafy.hereboard.enumeration.response.HereStatus;
import com.ssafy.hereboard.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.hereboard.repository.BoardImgRepository;
import com.ssafy.hereboard.repository.BoardRepository;
import com.ssafy.hereboard.repository.MemberRepository;
import com.ssafy.hereboard.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final ResponseUtil responseUtil;
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    private final BoardImgRepository boardImgRepository;

    public ResponseSuccessDto<SaveBoardResponseDto> save(SaveBoardRequestDto saveBoardRequestDto) {
        Member member = memberRepository.findById(saveBoardRequestDto.getMemberId())
                .orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));
        Board board = new Board().createBoard(member, saveBoardRequestDto);
        boardRepository.save(board);

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

}
