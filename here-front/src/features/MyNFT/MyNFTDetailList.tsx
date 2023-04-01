import NFTCardFront from "@/components/Card/NFTCardFront";
import { selectNFT, setTokenId } from "@/stores/myNFT/selectedNFT";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { MyNFTItem } from "@/types/MyNFTItem";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

interface Iprops {
  MyNFTList: MyNFTItem[];
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

export default function MyNFTDetailList({ MyNFTList }: Iprops) {
  const dispatch = useDispatch();
  const [curIdx, setCurIdx] = useState<number>(0);

  const selectedCardList = useSelector((state: RootState) => {
    return state.myNFT.selectedNFTList;
  });

  const marginStyle = (index: number) => {
    if (Math.abs(curIdx - index) > 1) return "invisible";
    else if (curIdx > index) return "ml-50 -mr-50";
    else if (curIdx < index) return "-ml-50 mr-50";
    else return "";
  };

  function handleNFTCardFrontClick(selectedNFT: number, tokenId: number) {
    dispatch(selectNFT(selectedNFT));
    dispatch(setTokenId(tokenId));
  }

  return (
    <div className="w-full">
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        className="flex w-900 items-center justify-center mobile:mt-[calc(50vh-240px)] mobile:w-[calc(100%-100px)]"
        css={[swiperStyle]}
      >
        {selectedCardList.map((item: number, index: number) => (
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
                  <div
                    className="mobile:hidden"
                    onClick={() =>
                      isActive &&
                      handleNFTCardFrontClick(item, MyNFTList[item]?.tokenId)
                    }
                  >
                    <NFTCardFront
                      width={isActive ? 300 : 250}
                      imgUrl={MyNFTList && MyNFTList[item]?.imgUrl}
                    />
                  </div>
                  <div
                    className="hidden mobile:block"
                    onClick={() =>
                      isActive &&
                      handleNFTCardFrontClick(item, MyNFTList[item]?.tokenId)
                    }
                  >
                    <NFTCardFront
                      width={isActive ? 200 : 180}
                      imgUrl={MyNFTList && MyNFTList[item]?.imgUrl}
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
