import { useState } from "react";

interface Member {
  bdCnt: number;
  recentBdDate: string;
  nextBdDays: number;
}

const exdata = {
  bdCnt: 2,
  recentBdDate: "22/01/23",
  nextBdDays: 34,
};

export default function BloodInfoContainer() {
  const [bdData, setBdData] = useState<Member>(exdata);

  return (
    <div className="flex h-500 w-600 flex-wrap justify-between mobile:mx-auto mobile:h-200 mobile:w-320">
      <div className="mb-10 flex h-160 w-600 flex-wrap justify-between border-b-3 border-pen-0 px-20 py-30 mobile:mx-0 mobile:w-100 mobile:border-0 mobile:px-0">
        <div className="mobile:h-100 mobile:text-center">
          <img
            src="icons/blood_count.svg"
            alt="blood_count"
            className="mr-20 inline-block mobile:mr-0 mobile:w-70"
          />
          <p className="inline-block text-center text-20 mobile:h-50 mobile:w-100 mobile:text-14">
            헌혈횟수
          </p>
        </div>
        <p className="mr-20 inline-block text-center text-48 font-bold leading-100 text-pen-1 mobile:mr-0 mobile:w-100 mobile:text-30 mobile:leading-30">
          {bdData.bdCnt}
        </p>
      </div>
      <div className="mb-10 flex h-160 w-600 flex-wrap justify-between border-b-3 border-pen-0 py-30 px-20 mobile:mx-0 mobile:w-100 mobile:border-0 mobile:px-0">
        <div className="mobile:h-100 mobile:text-center ">
          <img
            src="icons/blood_recent.svg"
            alt="blood_recent"
            className="mr-20 inline-block mobile:mr-0 mobile:w-70"
          />
          <p className="inline-block text-center text-20 mobile:h-50 mobile:w-100 mobile:text-14">
            최근 헌혈일
          </p>
        </div>
        <p className="mr-20 inline-block text-center text-40 font-bold leading-100 text-pen-1 mobile:mr-0 mobile:w-100 mobile:text-26 mobile:leading-30">
          {bdData.recentBdDate}
        </p>
      </div>
      <div className="flex h-160 w-600 flex-wrap justify-between py-30 px-20 mobile:mx-0 mobile:w-100 mobile:border-0 mobile:px-0 ">
        <div className="mobile:h-100 mobile:text-center ">
          <img
            src="icons/blood_next.svg"
            alt="blood_next"
            className="mr-20 inline-block mobile:mr-0 mobile:w-70"
          />
          <p className="inline-block text-20 mobile:h-50 mobile:w-100 mobile:text-14">
            다음 헌혈일까지
          </p>
        </div>
        <p className="mr-20 inline-block text-center text-40 font-bold leading-100 text-pen-1 mobile:mr-0 mobile:w-100 mobile:text-26 mobile:leading-30">
          {bdData.nextBdDays}일
        </p>
      </div>
    </div>
  );
}
