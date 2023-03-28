import NFTCardFront from "@/components/Card/NFTCardFront";
import { addNFT, clearNFTList, deleteNFT } from "@/stores/myNFT/myNFT";
import { RootState } from "@/stores/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface MyNFTList {
  tokenId: number;
  hashValue: string;
  imgUrl: string;
}
interface Iprops {
  myNFTList: MyNFTList[];
}
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

const mobileStyle = `
.swiper-button-prev{
  width: 20px;
  height: 20px;
  left: 20px;
  margin-top: -5px;
  color: #ff5050;
}
.swiper-button-next{         
  width: 20px;
  height: 20px;
  right: 20px;
  margin-top: -5px;
  color: #ff5050;
}
.swiper-button-prev:after{
  font-size: 20px;
}
.swiper-button-next:after{
  font-size: 20px;
}
`;

export default function MyNFTList({ myNFTList }: Iprops) {
  const dispatch = useDispatch();
  const selectedCardList = useSelector((state: RootState) => {
    return state.myNFT.selectedNFTList;
  });

  const handleSetSelectedCardList = (index: number) => {
    if (selectedCardList.includes(index)) {
      dispatch(deleteNFT(index));
    } else {
      dispatch(addNFT(index));
    }
  };

  useEffect(() => {
    dispatch(clearNFTList());
    if (myNFTList) {
      dispatch(addNFT(myNFTList[0]));
    }
  }, []);

  return (
    <div className="w-full">
      <div className="mobile:hidden">
        <Swiper
          slidesPerView={3}
          navigation={true}
          modules={[Navigation]}
          direction={"vertical"}
          className="static flex h-520 w-123"
          css={[swiperStyle]}
        >
          {myNFTList &&
            myNFTList.map((item: MyNFTList, index: number) => (
              <SwiperSlide
                className="relative mt-8 -mb-8 flex justify-center"
                key={index}
                onClick={() => handleSetSelectedCardList(index)}
              >
                {item.tokenId}
                <NFTCardFront width={100} imgUrl={item.imgUrl} />
                {selectedCardList.includes(index) && (
                  <img
                    src="/icons/check.svg"
                    className="absolute -top-8 right-5 h-25 w-25"
                  />
                )}
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="hidden w-full mobile:block">
        <Swiper
          slidesPerView={3}
          navigation={true}
          modules={[Navigation]}
          className="static flex h-137 w-[calc(100%-100px)]"
          css={[mobileStyle]}
        >
          {myNFTList &&
            myNFTList.map((item: MyNFTList, index: number) => (
              <SwiperSlide
                className="relative mt-8 -mb-8 flex justify-center"
                key={index}
                onClick={() => handleSetSelectedCardList(index)}
              >
                <NFTCardFront width={80} imgUrl={item.imgUrl} />

                {selectedCardList.includes(index) && (
                  <img
                    src="/icons/check.svg"
                    className="absolute -top-8 -right-5 h-25 w-25"
                  />
                )}
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
