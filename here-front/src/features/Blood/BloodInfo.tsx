import useMemberInfoQuery from "@/apis/blood/useMemberInfoQuery";
import Background from "@/components/Background/Background";
import { RootState } from "@/stores/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import BloodInfoModal from "./BloodInfoModal";

export default function BloodInfo() {
  const [openHistory, setOpenHistory] = useState<boolean>(false);

  const { memberId } = useSelector((state: RootState) => state.member);
  const member = useMemberInfoQuery(memberId);
  console.log(member.data);

  const handleModal = () => {
    setOpenHistory(!openHistory);
  };

  const bgColor = (characterType: string) => {
    if (characterType === "CAT") return "#E1E1E7";
    else if (characterType === "DOG") return "#F0E2B7";
    else if (characterType === "DEER") return "#E6DCD2";
    else return "#ffffff";
  };

  return (
    <>
      <div
        css={[
          member.data && {
            backgroundColor: bgColor(member.data.characterType),
          },
        ]}
        className="inline-block h-500 w-400 rounded-30 border-1 text-center mobile:mx-auto mobile:mt-32 mobile:h-400 mobile:w-300"
      >
        <img
          src={member.data ? member.data.characterImgUrl : ""}
          alt="characterImgUrl"
          className="mx-auto mt-50 mb-20 h-300 w-300 mobile:mt-30 mobile:h-240 mobile:w-240"
        />
        <div className="h-128 w-399 rounded-b-30 bg-white pt-16">
          <div>
            <span className="mr-10 text-22 font-semibold text-red-3">
              LEVEL.
              {member.data ? member.data.level : ""}
            </span>
            <span className="text-24 font-semibold">
              {member.data ? member.data.nickname : ""}
            </span>
          </div>
          <button
            className="my-10 h-32 w-180 rounded-30 border-1 border-pen-0 bg-pink-0 text-14 font-medium hover:font-semibold"
            onClick={handleModal}
          >
            나의 헌혈기록 보기
          </button>
          {openHistory && <BloodInfoModal />}
          {openHistory && <Background onClick={handleModal} />}
        </div>
      </div>
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
          <p className="mr-20 inline-block text-center text-48 font-bold leading-100 text-pen-1 mobile:mr-0 mobile:w-100 mobile:text-20 mobile:leading-30">
            {member.data ? member.data.bdCnt : ""}
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
          <p className="mr-20 inline-block text-center text-40 font-bold leading-100 text-pen-1 mobile:mr-0 mobile:w-100 mobile:text-18 mobile:leading-30">
            {member.data
              ? member.data.recentBdDate?.slice(2, 10).replaceAll("-", ".")
              : ""}
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
          <div className="text-pen-1 mobile:w-100">
            <div className="flex justify-center">
              <span className="inline-block h-50 w-150 pr-16 text-right text-16 leading-50 mobile:h-30 mobile:w-60 mobile:pr-4 mobile:text-10 mobile:leading-30">
                전혈
              </span>
              <span className="text-30 font-bold mobile:text-16 mobile:leading-30">
                {member.data ? member.data.nextWholeBdDays : ""}일
              </span>
            </div>
            <div className="flex justify-center">
              <span className="inline-block h-50 w-150 pr-16 text-right text-16 leading-50 mobile:h-30 mobile:w-60 mobile:pr-4 mobile:text-10 mobile:leading-30">
                혈장/혈소판
              </span>
              <span className="text-30 font-bold mobile:text-16 mobile:leading-30">
                {member.data ? member.data.nextNotWholeBdDays : ""}일
              </span>
            </div>
          </div>
          {/* <p className="mr-20 inline-block text-center text-40 font-bold leading-100 text-pen-1 mobile:mr-0 mobile:w-100 mobile:text-26 mobile:leading-30"></p> */}
        </div>
      </div>
    </>
  );
}
