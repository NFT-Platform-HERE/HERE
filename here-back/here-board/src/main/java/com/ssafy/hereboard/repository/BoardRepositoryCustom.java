package com.ssafy.hereboard.repository;

import com.ssafy.hereboard.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface BoardRepositoryCustom {

    // 전체 게시글 조회
    List<Board> findBoardList();

    // 내 게시글 조회
    List<Board> findMyBoardList(UUID memberId);

    // 게시글 검색
    List<Board> searchBoard(String query);

    // 전체 게시글 조회 (페이징)
    Page<Board> findBoardListPaging(Pageable pageable);

    // 내 게시글 조회 (페이징)
    Page<Board> findMyBoardListPaging(UUID memberId, Pageable pageable);

    // 게시글 검색 (페이징)
    Page<Board> searchBoardPaging(String word, Pageable pageable);
}
