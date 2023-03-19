import NFTCard from "@/components/Card/NFTCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export default function MyNFTPage() {
  return (
    <div className="w-min-[1200px] flex">
      <div className="mt-300 h-153 w-720 rotate-90">
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          navigation={true}
          modules={[Navigation]}
        >
          <SwiperSlide>
            <div className="h-137 w-214 bg-red-1">Slide 1</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-137 w-214 bg-blue-100">Slide 2</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-137 w-214 bg-purple-100">Slide 3</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-137 w-214 bg-yellow-100">Slide 4</div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div></div>
    </div>
  );
}
