package com.ssafy.herenft.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.herenft.entity.Nft;
import com.ssafy.herenft.entity.QNft;
import com.ssafy.herenft.eunmeration.EnumNftType;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.UUID;

import static com.ssafy.herenft.entity.QNft.nft;

public class NftRepositoryImpl implements NftRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public NftRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Nft> findHospitalNftAuto(UUID memberId, int count) {
        return queryFactory
                .selectFrom(nft)
                .where(
                        ownerEq(memberId),
                        nft.type.eq(EnumNftType.HOSPITAL)
                )
                .orderBy(
                        provideStatusOrder(),
                        nft.createdDate.asc()
                )
                .limit(count)
                .fetch();
    }

    @Override
    public List<Nft> findDonationList(UUID memberId, int count) {
        return queryFactory
                .select(nft)
                .from(nft)
                .where(ownerEq(memberId))
                .orderBy(
                        provideStatusOrder(),
                        nft.createdDate.asc()
                )
                .limit(count)
                .fetch();
    }

    private OrderSpecifier<Integer> provideStatusOrder() {
        NumberExpression<Integer> cases = new CaseBuilder()
                .when(nft.issuerId.ne(nft.ownerId)).then(1)
                .when(nft.issuerId.eq(nft.ownerId)).then(2)
                .otherwise(3);
        return new OrderSpecifier<>(Order.ASC, cases);
    }

    private BooleanExpression ownerEq(UUID memberId) {
        return memberId != null ? nft.ownerId.eq(memberId) : null;
    }
}
