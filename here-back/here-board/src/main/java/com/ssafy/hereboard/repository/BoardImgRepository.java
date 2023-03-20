package com.ssafy.hereboard.repository;

import com.ssafy.hereboard.entity.BoardImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardImgRepository extends JpaRepository<BoardImg, Long> {
    List<BoardImg> findAllByBoardId(Long boardId);
    String findByBoardId(Long boardId);
}
