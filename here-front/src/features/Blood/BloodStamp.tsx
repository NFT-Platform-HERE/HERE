import useStampQuery from "@/apis/blood/useStampQuery";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import Lottie from "react-lottie-player";
import stampHeart from "../../..//public/lottieJson/stamp_heart.json";

export default function BloodStamp() {
  const { memberId } = useSelector((state: RootState) => state.member);

  const stamp = useStampQuery(memberId);
  console.log("stamp", stamp.data);

  const stepList = [1, 2, 3, 4, 5, 6, 7];

  const getStamp = [
    "hidden",
    "absolute left-[305px] top-52 w-138",
    "absolute left-[589px] top-52 w-138",
    "absolute left-[685px] top-247 w-138",
    "absolute left-[407px] top-244 w-136",
    "absolute left-[140px] top-248 w-136",
    "absolute left-[305px] bottom-30 w-136",
    "absolute left-[606px] bottom-33 w-136",
  ];
  return (
    <div className="mb-100">
      <div className="relative z-20 mx-auto -mb-30 h-60 w-300 rounded-50 border-5 border-red-2 bg-white text-center text-20 font-semibold leading-50 text-red-2 mobile:h-50 mobile:w-[calc(100%-70px)] mobile:text-16 mobile:leading-40">
        헌혈 스탬프
      </div>
      <div className="relative z-10 h-615 w-1100 rounded-30 border-3 border-pen-5 mobile:w-full ">
        <img src="images/stamp_nobg.png" alt="stamp" className="w-1100" />
        {stepList.map((num) => (
          <>
            {num <= stamp.data?.step && (
              <img
                src={`stamp/step${num - 1}.png`}
                className={getStamp[num - 1]}
              />
            )}
          </>
        ))}

        <Lottie
          loop
          animationData={stampHeart}
          play
          style={{ width: 400, height: 180 }}
          className="absolute bottom-5 -right-110"
        />
      </div>
    </div>
  );
}
