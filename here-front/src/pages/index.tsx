import Footer from "@/components/Footer/Footer";
import Section1Mobile from "@/features/Home/Section1Mobile";
import Section1Web from "@/features/Home/Section1Web";
import Section2Mobile from "@/features/Home/Section2Mobile";
import Section2Web from "@/features/Home/Section2Web";
import Section3 from "@/features/Home/Section3";
import Section4 from "@/features/Home/Section4";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";

export default function HomePage() {
  useEffect(() => {
    AOS.init();
  }, []);

  const goToDown = () => {
    const element = document.getElementById(
      "section1",
    ) as HTMLInputElement | null;
    if (element != null) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  return (
    <div>
      <div className="aspect-[3.2/1] w-full min-w-[1200px] bg-[url('/banners/mainBanner.png')] bg-contain bg-no-repeat mobile:aspect-[1.15/1] mobile:w-full mobile:min-w-[300px] mobile:bg-[url('/banners/mainBannerMobile.png')]"></div>
      <div className="flex h-[calc(100vh-(100vw/3.2)-65px)] max-h-300 w-full min-w-[1200px] items-end justify-center mobile:hidden mobile:h-[calc(100vh-(100vw/1.15)-65px)] mobile:w-full mobile:min-w-[300px]">
        <button onClick={goToDown} className="my-auto">
          <BsChevronDoubleDown className="text-70 text-pen-0" />
        </button>
      </div>
      <section
        id="section1"
        // data-aos="fade-up"
        // data-aos-duration="3000"
        className="my-50 min-w-[1200px] mobile:my-50 mobile:w-full mobile:min-w-[300px]"
      >
        <div className="relative mx-auto mb-30 h-60 w-500 text-center mobile:w-300 ">
          <img
            src="mainItems/heart.png"
            alt="heart"
            className="absolute left-99 top-4 z-0 h-50 w-60 mobile:left-44 mobile:top-0 mobile:h-40 mobile:w-45"
          />
          <div className="relative z-10">
            <span className="text-36 font-medium text-red-3 mobile:text-24">
              HE:RE
            </span>
            <span className="text-32 font-medium mobile:text-22">
              에서 할 수 있어요
            </span>
          </div>
        </div>
        <div className="hidden mobile:block">
          <Section1Mobile />
        </div>
        <div className="pb-30 mobile:hidden">
          <Section1Web />
        </div>
      </section>

      <img
        src="mainItems/mainWave.png"
        alt="mainWave"
        className="mx-auto w-[75rem] min-w-[75rem] mobile:hidden"
      />

      <div className="hidden mobile:block">
        <Section2Mobile />
      </div>
      <div className="mobile:hidden">
        <Section2Web />
      </div>
      <Section3 />

      <Section4 />
      <Footer />
    </div>
  );
}
