package com.ssafy.hereboard.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.hereboard.entity.Board;
import com.ssafy.hereboard.enumeration.EnumBoardStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static com.ssafy.hereboard.entity.QBoard.board;

public class BoardRepositoryImpl implements BoardRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public BoardRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<Board> searchBoardPaging(String word, Pageable pageable){
        List<Board> content = queryFactory
                .select(board)
                .from(board)
                .where(statusEq(),wordContain(word))
                .orderBy(
                        provideStatusOrder(),
                        board.createdDate.desc()
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();


        JPAQuery<Board> countQuery = queryFactory
                .select(board)
                .from(board)
                .where(statusEq());

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    @Override
    public List<Board> findDeadlineBoardList() {
        return queryFactory
                .selectFrom(board)
                .where(
                        board.status.eq(EnumBoardStatus.ACTIVE),
                        board.deadline.loe(LocalDate.now())
                )
                .fetch();
    }

    @Override
    public Page<Board> findBoardListPaging(Pageable pageable) {
        List<Board> content = queryFactory
                .select(board)
                .from(board)
                .where(statusEq())
                .orderBy(
                        provideStatusOrder(),
                        board.createdDate.desc()
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();


        JPAQuery<Board> countQuery = queryFactory
                .select(board)
                .from(board)
                .where(statusEq());

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    @Override
    public Page<Board> findMyBoardListPaging(UUID memberId , Pageable pageable) {

        List<Board> content = queryFactory
                .select(board)
                .from(board)
                .where(
                        memberIdEq(memberId),
                        statusEq())
                .orderBy(
                        provideStatusOrder(),
                        board.createdDate.desc()
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Board> countQuery = queryFactory
                .select(board)
                .from(board)
                .where(
                        memberIdEq(memberId),
                        statusEq());

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
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
