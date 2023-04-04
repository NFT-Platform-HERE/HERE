import { BsPerson } from "react-icons/bs";
import { RiVipCrownLine } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";

export default function Footer() {
  return (
    <div className="flex h-300 w-full min-w-[1200px] flex-wrap justify-center bg-[#f7f7f7] text-14 font-light mobile:h-350 mobile:w-full mobile:min-w-300">
      <div className="w-500 mobile:w-full">
        <img
          src="images/logo.svg"
          className="mx-auto mt-100 w-150 mobile:mt-30 mobile:w-100"
        />
      </div>
      <div className="w-700 px-30 py-60 mobile:w-full mobile:py-10 mobile:text-center">
        <p className="text-16">SSAFY 8기 특화 프로젝트 (디지털 화폐)</p>
        <div className="mt-20 leading-30">
          <RiVipCrownLine className="mr-5 inline-block text-25" />
          <span>이현구</span>
        </div>
        <div className="leading-30">
          <BsPerson className="mr-5 inline-block text-25" />
          <span>김도언 이경택 조용현 최규림 최정온</span>
        </div>
        <div className="leading-30">
          <IoCallOutline className="mr-5 inline-block text-25" />
          <span>010-2295-6805</span>
        </div>
        <p className="mt-30">COPYRIGHT © 2현9해조</p>
      </div>
    </div>
  );
}
