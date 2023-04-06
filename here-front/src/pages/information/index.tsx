import { useState } from "react";
import {
  TbHexagonNumber1,
  TbHexagonNumber2,
  TbHexagonNumber3,
  TbHexagonNumber4,
} from "react-icons/tb";
import InfoFirst from "@/features/information/InfoFirst";
import InfoSecond from "@/features/information/InfoSecond";
import InfoThird from "@/features/information/InfoThird";
import InfoForth from "@/features/information/InfoForth";

export default function Information() {
  const [nowSection, setNowSection] = useState<number>(1);

  const selectSection = (param: number) => {
    setNowSection(param);
  };

  const basicStyle =
    "transition inline-block h-220 w-220 cursor-pointer rounded-full shadow-[0_15px_15px_0px_rgba(0,0,0,0.2)]";

  const selectedStyle =
    "transition transform scale-110 inline-block h-230 w-230 cursor-pointer rounded-full bg-red-1 shadow-[0_15px_15px_0px_rgba(0,0,0,0.2)]";

  return (
    <div className="mx-auto mt-50 w-1200 text-center">
      <div className="mx-auto text-30 font-semibold">
        <span className="text-40 text-red-3">HE:RE </span>
        사용 가이드
      </div>
      <div className="my-50 flex  justify-around px-50">
        <div
          onClick={() => selectSection(1)}
          className={nowSection === 1 ? selectedStyle : basicStyle}
        >
          <TbHexagonNumber1 className="mt-60 mb-20 inline-block text-40" />
          <h1>로그인 방법</h1>
        </div>
        <div
          onClick={() => selectSection(2)}
          className={nowSection === 2 ? selectedStyle : basicStyle}
        >
          <TbHexagonNumber2 className="mt-60 mb-20 inline-block text-40" />
          <h1>기부하기</h1>
        </div>
        <div
          onClick={() => selectSection(3)}
          className={nowSection === 3 ? selectedStyle : basicStyle}
        >
          <TbHexagonNumber3 className="mt-60 mb-20 inline-block text-40" />
          <h1>제출하기</h1>
        </div>
        <div
          onClick={() => selectSection(4)}
          className={nowSection === 4 ? selectedStyle : basicStyle}
        >
          <TbHexagonNumber4 className="mt-60 mb-20 inline-block text-40" />
          <h1>종이 헌혈증 등록</h1>
        </div>
      </div>
      <div className="mx-auto mt-70 mb-100 w-1200">
        {nowSection === 1 && <InfoFirst />}
        {nowSection === 2 && <InfoSecond />}
        {nowSection === 3 && <InfoThird />}
        {nowSection === 4 && <InfoForth />}
      </div>
    </div>
  );
}
