import Footer from "@/components/Footer/Footer";
import Section1Mobile from "@/features/Home/Section1Mobile";
import Section1Web from "@/features/Home/Section1Web";
import Section2Mobile from "@/features/Home/Section2Mobile";
import Section2Web from "@/features/Home/Section2Web";
import Section3 from "@/features/Home/Section3";
import Section4 from "@/features/Home/Section4";
import { BsChevronDoubleDown } from "react-icons/bs";
import Lottie from "react-lottie-player";
import mainArrow from "../../public/lottieJson/main_arrow.json";
import MainBannerWeb from "@/components/Banner/MainBannerWeb";
import MainBannerMobile from "@/components/Banner/MainBannerMobile";
import { IoCaretUpCircle } from "react-icons/io5";
import { useRouter } from "next/router";
import { FaQuestion } from "react-icons/fa";

export default function HomePage() {
  const router = useRouter();

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

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goToInfo = () => {
    router.push("/information");
  };

  return (
    <div>
      <IoCaretUpCircle
        className="fixed right-30 bottom-30 z-30 cursor-pointer rounded-full bg-white text-50 text-red-1"
        onClick={goToTop}
      />
      <div onClick={goToInfo}>
        <button className="fixed top-100 right-0 z-10 -mr-35 h-80 w-100 rounded-full border-4 border-red-2 bg-red-2 text-left font-semibold text-white ">
          {/* <FaQuestion className="inline-block w-50 text-18" /> */}
          <p className="ml-24 w-40 break-all text-15">사용</p>
          <p className="ml-10 w-50 break-all text-15">가이드</p>
        </button>
      </div>
      <div className="hidden mobile:block">
        <MainBannerMobile />
      </div>
      <div className="mobile:hidden">
        <MainBannerWeb />
      </div>
      <div className="flex h-[calc(100vh-(100vw/3)-65px)] max-h-250 w-full min-w-[1200px] items-end justify-center mobile:hidden mobile:h-[calc(100vh-(100vw/1.15)-65px)] mobile:w-full mobile:min-w-[300px]">
        <button
          onClick={goToDown}
          className="my-auto h-200 w-200 animate-pulse rounded-full active:bg-[#f6f6f6]"
        >
          <Lottie
            loop
            animationData={mainArrow}
            play
            style={{ width: 200, height: 200 }}
            className="mx-auto"
          />
        </button>
      </div>
      <section
        id="section1"
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
