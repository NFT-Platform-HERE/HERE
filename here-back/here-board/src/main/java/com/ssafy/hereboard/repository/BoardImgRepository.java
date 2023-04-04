package com.ssafy.hereboard.repository;

import com.ssafy.hereboard.entity.BoardImg;
import com.ssafy.hereboard.enumeration.EnumBoardImgStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardImgRepository extends JpaRepository<BoardImg, Long> {
    List<BoardImg> findAllByBoardIdAndStatusOrderByOrders(Long BoardId, EnumBoardImgStatus status);
}
