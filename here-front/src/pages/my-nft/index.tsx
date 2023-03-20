import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import NFTCardFront from "@/components/Card/NFTCardFront";
import NFTCardBack from "@/components/Card/NFTCardBack";
import { useEffect, useState } from "react";
import Background from "@/components/Background/Background";
import InstaBtn from "@/components/Button/InstaBtn";

const swiperList = [
  {
    index: 2,
  },
  {
    index: 3,
  },
  {
    index: 4,
  },
  {
    index: 5,
  },
];

const swiperStyle = `            
  .swiper-wrapper{
    width: 100%;
    height: 50%;
  }
  .swiper-button-prev{
    width: 30px;
    height: 30px;
    top: 37px;
    left: 55px;
    color: #ff5050;
    transform:rotate(90deg);
  }
  .swiper-button-next{         
    width: 30px;
    height: 30px;
    top: 615px;
    left: 55px;
    color: #ff5050;
    transform:rotate(90deg);
  }`;

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

export default function MyNFTPage() {
  const [selectedCardList, setSelectedCardList] = useState<number[]>([]);
  const [NFTCardBackIndex, setNFTCardBackIndex] = useState<number>(0);

  const handleSetSelectedCardList = (index: number) => {
    if (selectedCardList.includes(index)) {
      setSelectedCardList(
        selectedCardList.filter((selectedCard) => {
          return index !== selectedCard;
        }),
      );
    } else {
      setSelectedCardList([...selectedCardList, index]);
    }
  };

  useEffect(() => {
    if (swiperList) {
      setSelectedCardList([swiperList[0].index]);
    }
  }, []);

  return (
    <div className="w-min-[1200px] relative">
      <div className="flex w-full min-w-[1200px] justify-center">
        <div className="flex w-[1200px] items-center justify-between">
          <div className="relative flex h-630 w-137 items-center justify-center">
            <Swiper
              slidesPerView={3}
              navigation={true}
              modules={[Navigation]}
              direction={"vertical"}
              className="static flex h-520 w-137"
              css={[swiperStyle]}
            >
              {swiperList.map((item, index) => (
                <SwiperSlide
                  className="relative mt-8 -mb-8 flex justify-center"
                  key={index}
                  onClick={() => handleSetSelectedCardList(item.index)}
                >
                  <NFTCardFront
                    width={100}
                    imgUrl={`/NFT_bg_${item.index}.gif`}
                  />

                  {selectedCardList.includes(item.index) && (
                    <img
                      src="/icons/check.svg"
                      className="absolute -top-8 right-15 h-25 w-25"
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="relative flex w-983 justify-center gap-43">
            <div className="absolute -top-50 right-0">
              <InstaBtn
                width={195}
                height={40}
                onClick={() => console.log("click!")}
                fontSize={18}
              >
                SNS 공유하기
              </InstaBtn>
            </div>
            <Swiper
              slidesPerView={3}
              navigation={true}
              centeredSlides={true}
              modules={[Navigation]}
              className="static flex w-900 items-center justify-center"
              css={[navigatorStyle]}
            >
              {selectedCardList.map((item, index) => (
                <SwiperSlide className="z-0 flex items-center justify-center">
                  {({ isActive }) => (
                    <div
                      onClick={() => setNFTCardBackIndex(item)}
                      className={isActive ? "z-20" : "blur-sm"}
                    >
                      <NFTCardFront
                        width={isActive ? 300 : 250}
                        key={index}
                        imgUrl={`/NFT_bg_${item}.gif`}
                      />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {NFTCardBackIndex !== 0 && (
        <div>
          <Background onClick={() => setNFTCardBackIndex(0)} />

          <div className="fixed top-[calc(50%-175px)] left-[calc(50%-283px)] z-30">
            <NFTCardBack height={350} fontSize={18}></NFTCardBack>
          </div>
        </div>
      )}
    </div>
  );
}
