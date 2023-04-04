package com.ssafy.hereboard.repository;

import com.ssafy.hereboard.entity.Board;
import com.ssafy.hereboard.enumeration.EnumBoardStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long>, BoardRepositoryCustom {
    List<Board> findTop4ByStatusOrderByDeadlineAscCurQuantityAsc(EnumBoardStatus status);
}
