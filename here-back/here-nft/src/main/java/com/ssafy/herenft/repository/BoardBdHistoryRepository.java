package com.ssafy.herenft.repository;

import com.ssafy.herenft.entity.BoardBdHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface BoardBdHistoryRepository extends JpaRepository<BoardBdHistory, Long> {
    BoardBdHistory findByBoardIdAndSenderId(Long boardId, UUID senderId);

    List<BoardBdHistory> findAllByBoardIdAndSenderId(Long boardId, UUID senderId);
    List<BoardBdHistory> findAllByBoardId(Long boardId);
}
