import { useState } from "react";
import BloodInfoModal from "./BloodInfoModal";

export default function BloodUserContainer() {
  const [openHistory, setOpenHistory] = useState<boolean>(false);

  return (
    <div className="inline-block h-500 w-400 rounded-30 bg-pink-2 text-center mobile:mx-auto mobile:mt-32 mobile:h-400 mobile:w-300">
      <img
        src="nft_bg_1.gif"
        alt="나중에 유저 캐릭터로 바꾸기"
        className="mx-auto mt-50 mb-20 h-300 w-300 mobile:mt-30 mobile:h-240 mobile:w-240"
      />
      <p className="text-26 font-semibold">레벨 + 유저네임</p>
      <button
        className="my-10 h-32 w-180 rounded-30 border-1 border-pen-0 bg-pink-0 text-14 font-medium hover:font-semibold"
        onClick={() => setOpenHistory(!openHistory)}
      >
        나의 헌혈기록 보기
      </button>
      {openHistory && <BloodInfoModal />}
    </div>
  );
}
