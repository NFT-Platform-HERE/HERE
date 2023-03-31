import useInterval from "../../hooks/redcross/useInterval";
import { useState, useEffect } from "react";
import BackgroudDepth from "@/components/Background/BackgroudDepth";

const DonateLoadingModal = () => {
  const [index, setIndex] = useState<number>(0);

  const desc1 = [
    "메타마스크 창이 뜨면 서명을 완료해주세요 🦊",
    "잠시만 기다리시면 기부가 완료됩니다.",
  ];

  const desc2 = "기부가 끝날 때까지 사이트를 종료하지 말고 기다려주세요!";

  useInterval(() => {
    setIndex((prev) => {
      if (prev < 1) {
        return (prev += 1);
      } else {
        return 0;
      }
    });
  }, 3500);

  //* 모달이 켜졌을 때 body 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div>
      <BackgroudDepth onClick={() => {}} />
      <div className="fixed left-[50%] top-[50%] z-60 h-370 w-700 translate-x-[-50%] translate-y-[-50%] rounded-30 border-1 border-pen-0 bg-white text-center mobile:h-400 mobile:w-340">
        <div className="flex w-full flex-col items-center justify-center p-40">
          <div className="flex justify-center">
            <img
              src={"/images/ntf_cat.gif"}
              className="my-20 h-150 w-150 rounded-15 mobile:h-100 mobile:w-100"
            ></img>
          </div>
          <div className="mb-5 text-24 font-light text-red-500">{desc2}</div>
          <div className="text-20 font-light text-pen-2">{desc1[index]}</div>
        </div>
      </div>
    </div>
  );
};

export default DonateLoadingModal;
