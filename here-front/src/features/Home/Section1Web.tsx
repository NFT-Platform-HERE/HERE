import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Section1Web() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="mt-80 mb-50 flex flex-wrap justify-center">
      <div
        data-aos="fade-up"
        data-aos-duration="1500"
        className="relative mx-5 h-350 w-290 rounded-20 border-4 border-pink-0 text-center "
      >
        <p className="absolute -top-30 left-110 inline-block w-70 bg-white text-40 font-bold text-red-3">
          01
        </p>
        <p className="mt-50 mb-20 text-26 font-bold text-red-3">기부해요</p>
        <div className="mx-auto mb-20 flex h-120 w-120 items-center rounded-full bg-icon-1">
          <img
            src="mainItems/mainIcon1.png"
            alt="mainIcon1"
            className="mx-auto w-70 hover:w-76"
          />
        </div>
        <p>
          <b>NFT 헌혈증서</b> 기부를 통해
        </p>
        <p>사람들에게 온정을 나눠주세요</p>
      </div>
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="1500"
        className="relative mx-5 h-350 w-290 rounded-20 border-4 border-pink-0 text-center "
      >
        <p className="absolute -top-30 left-110 inline-block w-70 bg-white text-40 font-bold text-red-3">
          02
        </p>
        <p className="mt-50 mb-20 text-26 font-bold text-red-3">헌혈해요</p>
        <div className="mx-auto mb-20 flex h-120 w-120 items-center rounded-full bg-icon-2">
          <img
            src="mainItems/mainIcon2.png"
            alt="mainIcon2"
            className="mx-auto w-60 hover:w-65 hover:-rotate-2"
          />
        </div>
        <p>
          나의 <b>헌혈 기록</b>을 관리하고
        </p>
        <p>다음 헌혈 일정을 계획하세요</p>
      </div>
      <div
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="1500"
        className="relative mx-5 h-350 w-290 rounded-20 border-4 border-pink-0 text-center "
      >
        <p className="absolute -top-30 left-110 inline-block w-70 bg-white text-40 font-bold text-red-3">
          03
        </p>
        <p className="mt-50 mb-20 text-26 font-bold text-red-3">제출해요</p>
        <div className="mx-auto mb-20 flex h-120 w-120 items-center rounded-full bg-icon-1">
          <img
            src="mainItems/mainIcon3.png"
            alt="mainIcon3"
            className="mx-auto w-65 hover:w-70 hover:rotate-2"
          />
        </div>
        <p>
          병원과 기관에 <b>NFT 헌혈증서</b>를
        </p>
        <p>간편하게 제출하세요</p>
      </div>
      <div
        data-aos="fade-up"
        data-aos-delay="600"
        data-aos-duration="1500"
        className="relative mx-5 h-350 w-290 rounded-20 border-4 border-pink-0 text-center "
      >
        <p className="absolute -top-30 left-110 inline-block w-70 bg-white text-40 font-bold text-red-3">
          04
        </p>
        <p className="mt-50 mb-20 text-26 font-bold text-red-3">나의 NFT</p>
        <div className="mx-auto mb-20 flex h-120 w-120 items-center rounded-full bg-icon-2">
          <img
            src="mainItems/mainIcon4.png"
            alt="mainIcon4"
            className="mx-auto w-60 hover:w-66 hover:-rotate-3"
          />
        </div>
        <p>
          발급받은 <b>NFT 헌혈증서</b>를
        </p>
        <p>한 눈에 확인하세요</p>
      </div>
    </div>
  );
}
