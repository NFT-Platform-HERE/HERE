import Background from "@/components/Background/Background";
import MemberCard from "@/components/MemberCard/MemberCard";
import { setClose } from "@/stores/alarm/alarm";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DonateListModal from "./DonateListModal";

export default function WebAlarmDetailModal() {
  const dispatch = useDispatch();

  const { isOpen, nftHistoryList, senderId, alarmCode } = useSelector(
    (state: RootState) => state.alarm,
  );

  const memberId = useSelector((state: RootState) => state.member.memberId);

  return isOpen ? (
    <div>
      <Background onClick={() => dispatch(setClose())} />
      {alarmCode === "HOSPITAL" && (
        <DonateListModal nftHistoryList={nftHistoryList} memberId={memberId} />
      )}
      {(alarmCode === "DONATED" || alarmCode === "CLOSED") && (
        <MemberCard senderId={senderId} />
      )}
    </div>
  ) : (
    <div></div>
  );
}
