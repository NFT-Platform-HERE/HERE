package com.ssafy.herenft.repository;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.herenft.entity.BdHistory;
import com.ssafy.herenft.entity.Member;
import com.ssafy.herenft.entity.QBdHistory;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import static com.ssafy.herenft.entity.QBdHistory.bdHistory;

public class BdHistoryRepositoryImpl implements BdHistoryRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public BdHistoryRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public BdHistory findBdHistory(Member member, LocalDateTime issuedDate) {
        return queryFactory
                .selectFrom(bdHistory)
                .where(
                        bdHistory.member.eq(member)
                                .and(issuedDateEq(issuedDate))
                )
                .limit(1)
                .fetchOne();
    }

    private BooleanExpression issuedDateEq(LocalDateTime issuedDate) {
        if (issuedDate == null) return null;
        LocalDate date = issuedDate.toLocalDate();
        return bdHistory.issuedDate.year().eq(date.getYear())
                .and(bdHistory.issuedDate.month().eq(date.getMonthValue()));
    }
}
