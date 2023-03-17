package com.ssafy.hereboard.service;

import com.ssafy.hereboard.dto.common.response.ResponseSuccessDto;
import com.ssafy.hereboard.enumeration.response.HereStatus;
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
    private final BoardService boardService;

    public ResponseSuccessDto<String> test() {
        ResponseSuccessDto<String> res = responseUtil.successResponse("SER", HereStatus.HERE_SUCCESS_ONE);
        return res;
    }

}
