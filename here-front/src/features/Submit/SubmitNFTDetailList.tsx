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

  console.log("기관", organizationResult);
  console.log("병원", hospitalResult);

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
                  <div className="mobile:hidden">
                    <NFTCardBack
                      height={isActive ? 350 : 300}
                      fontSize={isActive ? 18 : 16}
                      detail={hospitalResult.data}
                    />
                  </div>
                  <div className="hidden mobile:block">
                    <NFTCardBack
                      height={isActive ? 203 : 150}
                      fontSize={isActive ? 12 : 10}
                      detail={hospitalResult.data}
                    />
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
      <div className="mobile:hidden">
        {organizationResult?.data?.length !== 0 && (
          <NFTCardBack
            height={350}
            fontSize={18}
            detail={organizationResult.data}
          />
        )}
      </div>
      <div className="hidden mobile:block">
        {organizationResult?.data?.length !== 0 && (
          <NFTCardBack
            height={203}
            fontSize={12}
            detail={organizationResult.data}
          />
        )}
      </div>
    </div>
  );
}
