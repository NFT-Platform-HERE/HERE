import CommonBanner from "@/components/Banner/CommonBanner";
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function SubmitBanner() {
  const bgColor = ["#FFC4BC", "#FFCEBF", "#FFB9A3"];

  return (
    <>
      <div className="mobile:hidden">
        <Swiper
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1500}
        >
          {bgColor.map((item, idx) => (
            <SwiperSlide>
              <CommonBanner
                width={1200}
                height={240}
                marginTop={50}
                bgColor={item}
                imgUrl={`banners/submitBannerWeb${idx + 1}.png`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="hidden mobile:block mobile:h-180">
        <Swiper
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1500}
        >
          {bgColor.map((item, idx) => (
            <SwiperSlide>
              <CommonBanner
                width={300}
                height={150}
                marginTop={20}
                bgColor={item}
                imgUrl={`banners/submitBannerMobile${idx + 1}.png`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
