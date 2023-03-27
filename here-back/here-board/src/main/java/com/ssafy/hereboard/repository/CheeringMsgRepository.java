package com.ssafy.hereboard.repository;

import com.ssafy.hereboard.entity.Board;
import com.ssafy.hereboard.entity.CheeringMsg;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheeringMsgRepository extends JpaRepository<CheeringMsg, Long> {
}
