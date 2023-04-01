import useStampQuery from "@/apis/blood/useStampQuery";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";

export default function BloodStamp() {
  const { memberId } = useSelector((state: RootState) => state.member);

  const stamp = useStampQuery(memberId);
  console.log("stamp", stamp.data);
  return (
    <div>
      <div className="h-60 w-300 rounded-50 border-5 border-red-2 bg-white text-center text-20 font-semibold leading-50 text-red-2 mobile:h-50 mobile:w-[calc(100%-70px)] mobile:text-16 mobile:leading-40">
        헌혈 스탬프
      </div>
    </div>
  );
}
