package com.ssafy.hereboard.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hereboard.entity.Board;
import com.ssafy.hereboard.enumeration.EnumBoardStatus;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.UUID;

import static com.ssafy.hereboard.entity.QBoard.board;

public class BoardRepositoryImpl implements BoardRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public BoardRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Board> findBoardList() {
        return queryFactory
                .selectFrom(board)
                .where(statusEq())
                .orderBy(
                        provideStatusOrder(),
                        board.createdDate.desc()
                )
                .fetch();
    }

    @Override
    public List<Board> findMyBoardList(UUID memberId) {
        return queryFactory
                .selectFrom(board)
                .where(
                        memberIdEq(memberId),
                        statusEq())
                .orderBy(
                        provideStatusOrder(),
                        board.createdDate.desc()
                )
                .fetch();
    }

    @Override
    public List<Board> searchBoard(String word) {
        return queryFactory
                .selectFrom(board)
                .where(
                        statusEq(),
                        wordContain(word)
                )
                .orderBy(
                        provideStatusOrder(),
                        board.createdDate.desc()
                )
                .fetch();
    }

    private OrderSpecifier<Integer> provideStatusOrder() {
        NumberExpression<Integer> cases = new CaseBuilder()
                .when(board.status.eq(EnumBoardStatus.ACTIVE)).then(1)
                .when(board.status.eq(EnumBoardStatus.INACTIVE)).then(2)
                .otherwise(3);
        return new OrderSpecifier<>(Order.ASC, cases);
    }

    private BooleanExpression statusEq() {
        return board.status.eq(EnumBoardStatus.ACTIVE)
                .or(board.status.eq(EnumBoardStatus.INACTIVE));
    }

    private BooleanExpression memberIdEq(UUID memberId) {
        return memberId != null ? board.member.id.eq(memberId) : null;
    }

    private BooleanExpression wordContain(String word) {
        return word == null ? null :
                board.content.contains(word)
                        .or(board.title.contains(word))
                        .or(board.member.nickname.contains(word));
    }
}
