import useMyNFTMetaDataQuery from "@/apis/my-nft/useMyNFTMetaDataQuery";
import useMyNFTMetaURLQuery from "@/apis/my-nft/useMyNFTMetaURLQuery";
import NFTCardBack from "@/components/Card/NFTCardBack";
import { RootState } from "@/stores/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

const swiperStyle = `
.swiper-slide {
  transform: none;
  width: 300px !important;
}
.swiper-wrapper {
  align-items: center;
}
@media(max-width: 480px){
  .swiper-slide {
    width: 33% !important;
  }
}
`;

export default function SubmitNFTDetailList() {
  const [curIdx, setCurIdx] = useState<number>(0);
  const organizationNFTInfo = useSelector((state: RootState) => {
    return state.submitSelectedOrganizationNFT.selectedOrganizationNFTInfo;
  });

  const hospitalNFTInfoList = useSelector((state: RootState) => {
    return state.submitSelectedHospitalNFT.selectedHospitalNFTInfoList;
  });

  const selectedCardList = useSelector((state: RootState) => {
    return state.submitSelectedHospitalNFT.selectedHospitalNFTList;
  });

  const submitTab = useSelector((state: RootState) => {
    return state.submitTab.tabName;
  });

  const organizationData = useMyNFTMetaURLQuery(organizationNFTInfo?.tokenId);

  const organizationResult = useMyNFTMetaDataQuery(organizationData?.data);

  const hospitalData = useMyNFTMetaURLQuery(
    hospitalNFTInfoList?.[curIdx]?.tokenId,
  );

  const hospitalResult = useMyNFTMetaDataQuery(hospitalData?.data);

  const marginStyle = (index: number) => {
    if (Math.abs(curIdx - index) > 1) return "invisible";
    else if (curIdx > index) return "ml-120 -mr-120";
    else if (curIdx < index) return "-ml-120 mr-120";
    else return "";
  };

  return submitTab === "HOSPITAL" ? (
    <div>
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        className="flex h-400 w-900 items-center justify-center mobile:h-200 mobile:w-[calc(100%)]"
        css={[swiperStyle]}
      >
        {selectedCardList.map((item, index) => (
          <SwiperSlide
            className={marginStyle(index) + " flex items-center justify-center"}
            key={index}
          >
            {({ isActive }) => {
              useEffect(() => {
                isActive && setCurIdx(index);
              }, [isActive]);

              return (
                <div
                  className={
                    isActive ? "relative flex" : "relative flex blur-sm"
                  }
                  css={[
                    curIdx > index ? { zIndex: 100 } : { zIndex: 100 - index },
                    isActive && { zIndex: 100 },
                  ]}
                >
                  <div className="h-350 w-566 mobile:hidden">
                    {hospitalResult?.data ? (
                      <NFTCardBack
                        height={isActive ? 350 : 300}
                        fontSize={isActive ? 18 : 16}
                        detail={hospitalResult.data}
                      />
                    ) : (
                      <div className="absolute -left-70 top-75 z-25 flex h-200 w-700 items-center justify-center rounded-20 border-2 border-red-2 bg-white text-20 text-red-2">
                        제출 가능한 NFT 헌혈증서가 없습니다.
                      </div>
                    )}
                  </div>
                  <div className="hidden h-203 w-328 mobile:block">
                    {hospitalResult?.data ? (
                      <NFTCardBack
                        height={isActive ? 203 : 150}
                        fontSize={isActive ? 12 : 10}
                        detail={hospitalResult.data}
                      />
                    ) : (
                      <div className="absolute left-5 top-55 z-25 flex h-100 w-320 items-center justify-center rounded-20 border-2 border-red-2 bg-white text-15 text-red-2">
                        제출 가능한 NFT 헌혈증서가 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              );
            }}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : (
    <div className="mt-25 flex justify-center mobile:mt-0">
      <div className="relative h-350 w-566 mobile:hidden">
        {organizationResult?.data ? (
          <NFTCardBack
            height={350}
            fontSize={18}
            detail={organizationResult.data}
          />
        ) : (
          <div className="absolute -left-70 top-75 z-25 flex h-200 w-700 items-center justify-center rounded-20 border-2 border-red-2 bg-white text-20 text-red-2">
            제출 가능한 NFT 헌혈증서가 없습니다.
          </div>
        )}
      </div>
      <div className="relative hidden h-203 w-328 mobile:block">
        {organizationResult?.data ? (
          <NFTCardBack
            height={203}
            fontSize={12}
            detail={organizationResult.data}
          />
        ) : (
          <div className="absolute left-5 top-55 z-25 flex h-100 w-320 items-center justify-center rounded-20 border-2 border-red-2 bg-white text-15 text-red-2">
            제출 가능한 NFT 헌혈증서가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
