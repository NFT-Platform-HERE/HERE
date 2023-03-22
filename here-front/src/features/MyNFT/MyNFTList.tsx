import NFTCardFront from "@/components/Card/NFTCardFront";
import { addNFT, clearNFTList, deleteNFT } from "@/stores/myNFT/myNFT";
import { RootState } from "@/stores/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface Iprops {
  myNFTList: any;
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
      dispatch(addNFT(myNFTList[0].index));
    }
    console.log(selectedCardList);
  }, []);

  return (
    <Swiper
      slidesPerView={3}
      navigation={true}
      modules={[Navigation]}
      direction={"vertical"}
      className="static flex h-520 w-137"
      css={[swiperStyle]}
    >
      {myNFTList.map((item: any, index: number) => (
        <SwiperSlide
          className="relative mt-8 -mb-8 flex justify-center"
          key={index}
          onClick={() => handleSetSelectedCardList(item.index)}
        >
          <NFTCardFront width={100} imgUrl={`/NFT_bg_${item.index}.gif`} />

          {selectedCardList.includes(item.index) && (
            <img
              src="/icons/check.svg"
              className="absolute -top-8 right-15 h-25 w-25"
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
