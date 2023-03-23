import Background from "@/components/Background/Background";
import NFTCardBack from "@/components/Card/NFTCardBack";
import NFTCardFront from "@/components/Card/NFTCardFront";
import { selectNFT } from "@/stores/myNFT/selectedNFT";
import zIndex from "@mui/material/styles/zIndex";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface Iprops {
  selectedCardList: any;
}

const swiperStyle = `
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
  }
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

export default function SelectedNFTList({ selectedCardList }: Iprops) {
  const dispatch = useDispatch();
  const [curIdx, setCurIdx] = useState<number>(0);

  const marginStyle = (index: number) => {
    if (Math.abs(curIdx - index) > 1) return "invisible";
    else if (curIdx > index) return "ml-50 -mr-50";
    else if (curIdx < index) return "-ml-50 mr-50";
    else return "";
  };

  return (
    <div className="w-full">
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        className="flex w-900 items-center justify-center mobile:mt-[calc(50vh-240px)] mobile:w-[calc(100%-100px)]"
        css={[swiperStyle]}
      >
        {selectedCardList.map((item: any, index: number) => (
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
                  onClick={() => dispatch(selectNFT(item))}
                  className={
                    isActive ? "relative flex" : "relative flex blur-sm"
                  }
                  css={[
                    curIdx > index ? { zIndex: 100 } : { zIndex: 100 - index },
                    isActive && { zIndex: 100 },
                  ]}
                >
                  <div className="mobile:hidden">
                    <NFTCardFront
                      width={isActive ? 300 : 250}
                      imgUrl={`/NFT_bg_${item}.gif`}
                    />
                  </div>
                  <div className="hidden mobile:block">
                    <NFTCardFront
                      width={isActive ? 200 : 180}
                      imgUrl={`/NFT_bg_${item}.gif`}
                    />
                  </div>
                </div>
              );
            }}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
