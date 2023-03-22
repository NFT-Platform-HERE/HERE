import Background from "@/components/Background/Background";
import NFTCardBack from "@/components/Card/NFTCardBack";
import NFTCardFront from "@/components/Card/NFTCardFront";
import { selectNFT } from "@/stores/myNFT/selectedNFT";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface Iprops {
  selectedCardList: any;
}

const navigatorStyle = `
  .swiper-button-prev{
    width: 30px;
    height: 30px;
    left: 0px;
    color: #ff5050;
  }
  .swiper-button-next{         
    width: 30px;
    height: 30px;
    right: 0px;
    color: #ff5050;
  }`;

export default function SelectedNFTList({ selectedCardList }: Iprops) {
  const dispatch = useDispatch();

  return (
    <div>
      <Swiper
        slidesPerView={3}
        navigation={true}
        centeredSlides={true}
        modules={[Navigation]}
        className="static flex w-900 items-center justify-center mobile:w-200"
        css={[navigatorStyle]}
      >
        {selectedCardList.map((item: any, index: number) => (
          <SwiperSlide
            className="z-0 flex items-center justify-center"
            key={index}
          >
            {({ isActive }) => (
              <div
                onClick={() => dispatch(selectNFT(item))}
                className={isActive ? "z-20" : "blur-sm"}
              >
                <div className="mobile:hidden">
                  <NFTCardFront
                    width={isActive ? 300 : 250}
                    imgUrl={`/NFT_bg_${item}.gif`}
                  />
                </div>
                <div className="hidden mobile:block">
                  <NFTCardFront
                    width={isActive ? 100 : 70}
                    imgUrl={`/NFT_bg_${item}.gif`}
                  />
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
