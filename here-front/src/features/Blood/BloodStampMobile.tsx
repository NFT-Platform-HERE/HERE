import useStampQuery from "@/apis/blood/useStampQuery";
import { RootState } from "@/stores/store";
import Lottie from "react-lottie-player";
import { useSelector } from "react-redux";
import stampHeart from "../../../public/lottieJson/stamp_heart.json";

export default function BloodStampMobile() {
  const { memberId } = useSelector((state: RootState) => state.member);
  const stamp = useStampQuery(memberId);
  const stepList = [1, 2, 3, 4, 5, 6, 7];

  const getStampMobile = [
    "hidden",
    "absolute top-78 left-164 w-82",
    "absolute top-198 left-59 w-82",
    "absolute top-[309px] left-148 w-82",
    "absolute top-[436px] left-202 w-82",
    "absolute bottom-271 left-76 w-84",
    "absolute bottom-168 right-25 w-84",
    "absolute bottom-113 left-83 w-84",
  ];

  return (
    <div className="mb-100">
      <div className="relative z-20 mx-auto -mb-30 h-50 w-[calc(100%-70px)] rounded-50 border-5 border-red-2 bg-white  text-center text-16 font-semibold leading-40 text-red-2">
        헌혈 스탬프
      </div>
      <div className="relative z-10 mx-auto box-border h-900 w-350 overflow-hidden rounded-30 border-3 border-pen-5">
        <img
          src="stamp/stamp_mobile.png"
          alt="stamp"
          className="mt-30 w-full"
        />

        {stepList.map((num) => (
          <>
            {num <= stamp.data?.step && (
              <img
                src={`stamp/step${num - 1}.png`}
                className={getStampMobile[num - 1]}
              />
            )}
          </>
        ))}

        <Lottie
          loop
          animationData={stampHeart}
          play
          style={{ width: 200, height: 120 }}
          className="absolute -bottom-5 -right-40 "
        />
      </div>
    </div>
  );
}
