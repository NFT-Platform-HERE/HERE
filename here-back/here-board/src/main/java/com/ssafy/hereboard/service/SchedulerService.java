package com.ssafy.hereboard.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.ssafy.hereboard.entity.Board;
import com.ssafy.hereboard.entity.BoardBdHistory;
import com.ssafy.hereboard.entity.Member;
import com.ssafy.hereboard.enumeration.EnumBoardStatus;
import com.ssafy.hereboard.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.hereboard.repository.BoardBdHistoryRepository;
import com.ssafy.hereboard.repository.BoardRepository;
import com.ssafy.hereboard.repository.MemberRepository;
import com.ssafy.hereboard.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class SchedulerService {

    private final ResponseUtil responseUtil;
    private final BoardRepository boardRepository;
    private final BoardBdHistoryRepository boardBdHistoryRepository;
    private final MemberRepository memberRepository;
    private final RestTemplate restTemplate;

    /* 매 정각에 deadline 확인 */
    @Scheduled(cron = "0 0 0 * * *")
    public void checkDeadline() throws Exception {
        log.info("check deadline board!!");
        List<Board> deadlineBoardList = boardRepository.findDeadlineBoardList();

        for (Board board : deadlineBoardList) {
            board.updateBoardStatus(EnumBoardStatus.INACTIVE);
            log.info("changed board id : {}", board.getId());

            Member sender = board.getMember();
            List<BoardBdHistory> boardBdHistoryList = boardBdHistoryRepository.findAllByBoardId(board.getId());
            for (BoardBdHistory boardBdHistory : boardBdHistoryList) {
                Member receiver = memberRepository.findById(boardBdHistory.getSenderId()).orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));

                ObjectNode jsonNodes = JsonNodeFactory.instance.objectNode();
                String message = sender.getNickname() + "님께서 기부하신 " + receiver.getNickname() + "님의 게시글이 마감되었습니다.";
                jsonNodes.put("content", message);
                jsonNodes.put("receiverId", receiver.getId().toString());
                jsonNodes.put("senderId", sender.getId().toString());

                ResponseEntity<JsonNode> postResult = restTemplate.postForEntity(
                        "https://j8b209.p.ssafy.io:9010/api/notification",
                        jsonNodes,
                        JsonNode.class
                );

                System.out.println(postResult.toString());
            }
        }
    }
}
