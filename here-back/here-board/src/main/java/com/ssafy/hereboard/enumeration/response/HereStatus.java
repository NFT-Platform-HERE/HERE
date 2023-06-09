package com.ssafy.hereboard.enumeration.response;

public enum HereStatus {
    HERE_SUCCESS_ONE,
    HERE_WRITE_BOARD,
    HERE_FIND_BOARD_DETAIL,
    // 게시글 수정 성공
    HERE_UPDATE_BOARD,
    // 게시글 삭제 성공
    HERE_DELETE_BOARD,
    // 게시글 마감 성공
    HERE_CLOSE_BOARD,
    // 전체 게시글 조회 성공
    HERE_FIND_BOARD,
    // 응원 메시지 수정 성공
    HERE_UPDATE_CHEERING_MSG_CNT,
    // 응원 메시지 조회 성공
    HERE_FIND_CHEERING_MSG,
    // 기부리스트 등록 성공
    HERE_CREATE_DONATION,

}
