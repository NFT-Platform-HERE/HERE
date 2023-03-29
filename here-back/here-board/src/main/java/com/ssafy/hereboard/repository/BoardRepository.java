package com.ssafy.hereboard.repository;

import com.ssafy.hereboard.entity.Board;
import com.ssafy.hereboard.enumeration.EnumBoardStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface BoardRepository extends JpaRepository<Board, Long>, BoardRepositoryCustom {
    @Query("select b from Board b where b.status= 'ACTIVE' or b.status= 'INACTIVE'" +
            "order by b.status asc, b.createdDate desc")
    List<Board> findAllByStatusOrderByCreatedDateDesc();

    @Query("select b from Board b where (b.member.id= :memberId and b.status= 'ACTIVE') or (b.member.id= :memberId and b.status= 'INACTIVE')" +
            "order by b.status asc, b.createdDate desc")
    List<Board> findMineAllByStatusOrderByCreatedDateDesc(@Param("memberId") UUID memberId);

    @Query("select b from Board b where (b.status= 'ACTIVE' or b.status= 'INACTIVE') and" +
            "((b.content like %:query%) or (b.title like %:query%) or (b.member.nickname like %:query%))" +
            "order by b.status asc, b.createdDate desc")
    List<Board> findAllBySearch(String query);

    List<Board> findTop4ByStatusOrderByDeadlineAscCurQuantityAsc(EnumBoardStatus status);
}
