package com.ssafy.herenft.repository;

import com.ssafy.herenft.entity.BoardBdHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BoardBdHistoryRepository extends JpaRepository<BoardBdHistory, Long> {

    @Query("select bbh.senderId from BoardBdHistory bbh where bbh.boardId= :boardId")
    List<String> findAllSenderIdByBoardId(Long boardId);

    List<BoardBdHistory> findAllByBoardId(Long boardId);

    BoardBdHistory findByBoardIdAndSenderId(Long boardId, UUID senderId);
}
