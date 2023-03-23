package com.ssafy.herenft.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.herenft.dto.nft.FindHospitalNftResponseDto;
import com.ssafy.herenft.entity.Member;
import com.ssafy.herenft.entity.Nft;
import com.ssafy.herenft.entity.QNft;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.UUID;

import static com.ssafy.herenft.entity.QNft.nft;

public class NftRepositoryImpl implements NftRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public NftRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<FindHospitalNftResponseDto> findHospitalNftAuto(Member member, int count) {
        return null;
//        return queryFactory
//                .select(new FindHospitalNftResponseDto(member.getName(), nft.createdDate))
//                .from(nft);
    }

}
