package com.ssafy.hereboard.repository;

import com.ssafy.hereboard.entity.Board;
import com.ssafy.hereboard.entity.BoardImg;
import com.ssafy.hereboard.entity.BoardMsg;
import com.ssafy.hereboard.enumeration.EnumBoardMsgStatus;
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

//    @Query(value = "select count(bm.cheeringMsgId) from BoardMsg bm where (bm.board= :board and bm.status='ACTIVE') GROUP BY bm.cheeringMsgId")
//    List<?> findAllByBoardGroupByCheeringMsgId(Board board);

//    @Query("select count(*) from BoardMsg bm where bm.board= :board and bm.cheeringMsgId= :cheeringMsgId and bm.status= ")
//    int findCountByBoardAndCheeringMsgId(Board board, Long cheeringMsgId);

    Optional<BoardMsg> findByBoardAndCheeringMsgIdAndMemberIdAndStatus(Board board, Long cheeringMsgId, UUID memberId, EnumBoardMsgStatus active);
}
