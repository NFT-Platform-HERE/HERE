package com.ssafy.hereboard.service;

import com.ssafy.hereboard.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereboard.entity.Board;
import com.ssafy.hereboard.enumeration.response.HereStatus;
import com.ssafy.hereboard.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.hereboard.repository.BoardRepository;
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
    private final BoardRepository boardRepository;

    public ResponseSuccessDto<String> test() {
        Board board = boardRepository.findById(100L).orElseThrow(() -> new EntityIsNullException("게시글 없음"));
        ResponseSuccessDto<String> res = responseUtil.successResponse("SER", HereStatus.HERE_SUCCESS_ONE);
        return res;
    }

}
