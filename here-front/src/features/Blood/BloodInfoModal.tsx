import useBloodHistoryQuery from "@/apis/blood/useBloodHistoryQuery";
import { RootState } from "@/stores/store";
import { BloodHistory } from "@/types/BloodHistory";
import { useSelector } from "react-redux";

export default function BloodInfoModal() {
  const { memberId } = useSelector((state: RootState) => state.member);
  const bdHistory = useBloodHistoryQuery(memberId);

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
      {bdHistory.data && (
        <div className="h-540 w-492 overflow-y-auto overflow-x-hidden mobile:h-340 mobile:w-340">
          {bdHistory.data.map((item: BloodHistory, idx: number) => (
            <div
              key={item.bdHistoryId}
              className="mx-auto flex h-60 w-480 justify-around border-b-1 border-pen-0 mobile:w-320"
            >
              <p className="inline-block w-40 font-light leading-60 mobile:text-14">
                {idx + 1}
              </p>
              <p className="inline-block  w-100 font-light leading-60 mobile:text-14">
                {item.issuedDate.slice(0, 10)}
              </p>
              <p className="inline-block w-60 font-light leading-60 mobile:text-14">
                {item.bdType === "WHOLE" && "전혈"}
                {item.bdType === "PLASMA" && "혈장"}
                {item.bdType === "PLATELET" && "혈소판"}
              </p>
              <p className="inline-block w-150 font-light leading-60 mobile:text-14">
                {item.place}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
