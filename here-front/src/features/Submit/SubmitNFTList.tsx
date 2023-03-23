import { Swiper, SwiperSlide } from "swiper/react";

export default function SubmitNFTList() {
  return (
    <div className="mt-50 mb-50 w-[1200px]">
      <Swiper slidesPerView={4} className="">
        <SwiperSlide>
          <div className="h-175 w-275 bg-red-0"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-175 w-275 bg-red-0"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-175 w-275 bg-red-0"></div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-175 w-275 bg-red-0"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
