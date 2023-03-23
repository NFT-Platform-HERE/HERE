package com.ssafy.hereboard.repository;

import com.ssafy.hereboard.entity.Board;

import java.util.List;
import java.util.UUID;

public interface BoardRepositoryCustom {

    // 전체 게시글 조회
    List<Board> findBoardList();

    // 내 게시글 조회
    List<Board> findMyBoardList(UUID memberId);

    // 게시글 검색
    List<Board> searchBoard(String query);
}
