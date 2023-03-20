import { useState } from "react";

interface bdHistoryList {
  bdHistoryId: number;
  issuedDate: string;
  place: string;
  bdType: string;
}

const exdata = [
  {
    bdHistoryId: 121324,
    issuedDate: "2020-01-01",
    place: "대전혈액원",
    bdType: "전혈",
  },
  {
    bdHistoryId: 23122,
    issuedDate: "2020-01-20",
    place: "대전혈액원",
    bdType: "전혈",
  },
  {
    bdHistoryId: 32,
    issuedDate: "2020-01-20",
    place: "대전혈액원",
    bdType: "전혈",
  },
  {
    bdHistoryId: 12,
    issuedDate: "2020-01-20",
    place: "대전혈액원",
    bdType: "전혈",
  },
  {
    bdHistoryId: 421,
    issuedDate: "2020-01-20",
    place: "대전혈액원",
    bdType: "전혈",
  },
  {
    bdHistoryId: 2313,
    issuedDate: "2020-01-20",
    place: "대전혈액원",
    bdType: "전혈",
  },
  {
    bdHistoryId: 2323,
    issuedDate: "2020-01-20",
    place: "대전혈액원",
    bdType: "전혈",
  },
  //   {
  //     bdHistoryId: 53,
  //     issuedDate: "2020-01-20",
  //     place: "대전혈액원",
  //     bdType: "전혈",
  //   },
  //   {
  //     bdHistoryId: 534341,
  //     issuedDate: "2020-01-20",
  //     place: "대전혈액",
  //     bdType: "전혈",
  //   },
  //   {
  //     bdHistoryId: 5422,
  //     issuedDate: "2020-01-20",
  //     place: "대전혈액",
  //     bdType: "전혈",
  //   },
  //   {
  //     bdHistoryId: 799,
  //     issuedDate: "2020-01-20",
  //     place: "대전혈액",
  //     bdType: "전혈",
  //   },
];

export default function BloodInfoModal() {
  const [bdHistory, setBdHistory] = useState<bdHistoryList[]>(exdata);

  return (
    <div className="fixed left-[50%] top-[50%] z-50 h-600 w-500 translate-x-[-50%] translate-y-[-50%] rounded-10 border-2 border-pen-0 bg-white text-center mobile:h-400 mobile:w-340">
      <div className="h-60 w-496 rounded-t-10 bg-pink-0 mobile:w-336">
        <div className="mx-auto flex w-480 justify-around mobile:w-320">
          <p className="inline-block w-40 font-semibold leading-60  mobile:text-15">
            번호
          </p>
          <p className="inline-block w-100 font-semibold leading-60 mobile:text-15">
            일시
          </p>
          <p className="inline-block w-60 font-semibold leading-60 mobile:text-15">
            종류
          </p>
          <p className="inline-block w-150 font-semibold leading-60 mobile:text-15">
            장소
          </p>
        </div>
      </div>
      <div className="h-540 w-492 overflow-y-auto overflow-x-hidden mobile:h-340 mobile:w-340">
        {bdHistory.map((item, idx) => (
          <div
            key={item.bdHistoryId}
            className="mx-auto flex h-60 w-480 justify-around border-b-1 border-pen-0 mobile:w-320"
          >
            <p className="inline-block w-40 font-light leading-60 mobile:text-14">
              {idx + 1}
            </p>
            <p className="inline-block  w-100 font-light leading-60 mobile:text-14">
              {item.issuedDate}
            </p>
            <p className="inline-block w-60 font-light leading-60 mobile:text-14">
              {item.bdType}
            </p>
            <p className="inline-block w-150 font-light leading-60 mobile:text-14">
              {item.place}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
