import useAlarmQuery from "@/apis/alarm/useAlarmQuery";
import useAlarmReadUpdate from "@/apis/alarm/useAlarmReadUpdate";
import AlarmList from "@/components/Alarm/AlarmList";
import Background from "@/components/Background/Background";
import MemberCard from "@/components/MemberCard/MemberCard";
import { RootState } from "@/stores/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Alarm } from "@/types/Alarm";

export default function WebAlarmModal() {
  const { mutate } = useAlarmReadUpdate();
  const { memberId } = useSelector((state: RootState) => state.member);
  const alarmList = useAlarmQuery(memberId);
  const [openCard, setOpenCard] = useState<boolean>(false);

  const changeStatus = (notificationId: number) => {
    const payload = {
      memberId,
      notificationId,
    };
    mutate(payload);
    setOpenCard(!openCard);
  };

  return (
    <div className="absolute -left-[320px] top-60 h-280 w-400 bg-[url('/images/alarmBack.png')] bg-contain bg-no-repeat  py-20 pr-24 ">
      <div className="h-230 w-365 overflow-y-auto overflow-x-hidden scrollbar-hide ">
        {alarmList?.data?.map((item: Alarm) => (
          <div key={item.notificationId}>
            <AlarmList
              text={item.content}
              onClick={() => changeStatus(item.notificationId)}
            />
            {openCard && <MemberCard senderId={item.senderId} />}
            {openCard && <Background onClick={() => setOpenCard(!openCard)} />}
          </div>
        ))}
      </div>
    </div>
  );
}
