package com.ssafy.hereboard.repository;

import com.ssafy.hereboard.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("select b from Board b where b.status= 'ACTIVE' or b.status= 'INACTIVE'" +
            "order by b.status asc, b.createdDate desc")
    List<Board> findAllByStatusOrderByCreatedDateAsc();
}
