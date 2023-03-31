import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Section4() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="mb-90 min-w-[1200px] mobile:w-full mobile:min-w-[300px]">
      <div className="mx-auto h-70 w-350 text-center mobile:w-300">
        <span className="text-40 font-medium leading-70 text-red-3 mobile:text-24">
          헌혈
        </span>
        <span className="text-32 font-medium leading-70 mobile:text-18">
          , 왜 필요할까요
        </span>
        <img
          src="mainItems/question.svg"
          alt="question"
          className="inline-block h-70 align-top"
        />
      </div>
      <div className="my-50 flex flex-wrap justify-center text-center">
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          className="my-auto h-300 w-300 rounded-full bg-icon-3 mobile:h-250 mobile:w-250"
        >
          <img
            src="mainItems/mainBottom1.svg"
            alt="mainBottom1"
            className="mt-60 mb-20 inline-block w-90 mobile:mt-48 mobile:w-80"
          />
          <p className="mobile:text-14">혈액은 수혈이 필요한 환자의</p>
          <p className="mobile:text-14">
            <b>생명을 구하는 </b>유일한 수단
          </p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="z-10 mx-40 my-auto h-350 w-350 rounded-full bg-icon-4 mobile:-my-35 mobile:h-280 mobile:w-280"
        >
          <img
            src="mainItems/mainBottom2.svg"
            alt="mainBottom2"
            className="mt-60 mb-20 inline-block w-100 mobile:mt-48 mobile:w-85"
          />
          <p className="mobile:text-14">혈액은 대체할 수 없으며</p>
          <p className="mobile:text-14">장기간 보관이 불가능하기 때문에 </p>
          <p className="mobile:text-14">
            <b>지속적이고 꾸준한 헌혈</b>이 필요
          </p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="2000"
          className="my-auto h-300 w-300 rounded-full bg-icon-5 mobile:h-250 mobile:w-250"
        >
          <img
            src="mainItems/mainBottom3.svg"
            alt="mainBottom3"
            className="mt-60 mb-20 inline-block w-90 mobile:mt-48 mobile:w-75"
          />
          <p className="mobile:text-14">헌혈은 나와 내 가족, 더 나아가</p>
          <p className="mobile:text-14">
            우리 모두를 위한 <b>사랑의 실천</b>
          </p>
        </div>
      </div>
    </section>
  );
}
