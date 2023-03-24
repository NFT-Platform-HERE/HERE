import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import SubmitNFTPreview from "./SubmitNFTPreview";
import { useState } from "react";

const swiperStyle = `
.swiper-button-prev{
  width: 20px;
  height: 20px;
  top: 60px;
  margin-top: -5px;
  color: #ff5050;
}
.swiper-button-next{         
  width: 20px;
  height: 20px;
  margin-top: -5px;
  color: #ff5050;
}

`;

const samplePreview = [
  {
    name: "이경택",
    registerDate: "2023-03-24",
  },
  {
    name: "최정온",
    registerDate: "2023-02-14",
  },
  {
    name: "조용현",
    registerDate: "2023-01-14",
  },
  {
    name: "이현구",
    registerDate: "2022-05-24",
  },
  {
    name: "최규림",
    registerDate: "2021-02-24",
  },
  {
    name: "김도언",
    registerDate: "2021-07-24",
  },
];

export default function SubmitNFTList() {
  return (
    <div className="relative mt-70 mb-50">
      <Swiper
        slidesPerView={4}
        className="static flex w-[1050px] justify-center"
        navigation={true}
        modules={[Navigation]}
        css={[swiperStyle]}
      >
        {samplePreview.map((item, index) => (
          <SwiperSlide className="relative flex justify-center" key={index}>
            <SubmitNFTPreview
              id={index}
              name={item.name}
              registerDate={item.registerDate}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
