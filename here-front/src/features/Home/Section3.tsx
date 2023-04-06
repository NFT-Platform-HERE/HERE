import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
SwiperCore.use([Autoplay]);

export default function Section3() {
  return (
    <section className="my-80 flex min-w-[1200px] justify-center bg-pink-0 py-80 mobile:my-50 mobile:w-full mobile:min-w-[300px]">
      <div className="relative my-auto inline-block h-160 w-200 mobile:ml-8 mobile:h-100 mobile:w-80">
        <img
          src="mainItems/pong2.png"
          alt="pong2"
          className="absolute -top-10 -left-20 z-0 h-60 w-45 rotate-12 mobile:-left-8 mobile:-top-12 mobile:h-45 mobile:w-30"
        />

        <div className="relative z-10">
          <span className="text-36 font-semibold text-red-3 mobile:text-24">
            헌혈
          </span>
          <span className="text-36 font-semibold mobile:text-24">,</span>
          <p className="text-28 font-medium mobile:text-18">같이 해요</p>
        </div>
      </div>
      <div className="inline-block h-500 w-800 border-5 border-pink-3 mobile:h-180 mobile:w-288">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1500}
          className="flex h-full w-full flex-wrap items-center justify-center"
        >
          <SwiperSlide>
            <img src="images/pic3.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/pic2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="images/pic1.jpg" />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
