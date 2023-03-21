package com.ssafy.hereboard.repository;

import com.ssafy.hereboard.entity.Board;
import com.ssafy.hereboard.entity.BoardImg;
import com.ssafy.hereboard.entity.BoardMsg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BoardMsgRepository extends JpaRepository<BoardMsg, Long> {
    @Query("select bm from BoardMsg bm where bm.board = :board and bm.memberId = :memberId and bm.cheeringMsgId = :cheeringMsgId")
    Optional<BoardMsg> findByBoardAndMemberIdAndMsgId(Board board, UUID memberId, Long cheeringMsgId);

    @Query("select bm from BoardMsg bm where bm.board= :board and bm.status= 'ACTIVE' and bm.cheeringMsgId= :cheeringMsgId")
    List<BoardMsg> findAllByBoardAndCheeringMsgIdAndStatusActive(Board board, Long cheeringMsgId);
}
