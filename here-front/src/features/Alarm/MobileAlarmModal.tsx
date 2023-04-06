import useAlarmQuery from "@/apis/alarm/useAlarmQuery";
import useAlarmReadUpdate from "@/apis/alarm/useAlarmReadUpdate";
import AlarmList from "@/components/Alarm/AlarmList";
import Background from "@/components/Background/Background";
import MemberCard from "@/components/MemberCard/MemberCard";
import { RootState } from "@/stores/store";
import { Alarm } from "@/types/Alarm";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function MobileAlarmModal() {
  const { mutate } = useAlarmReadUpdate();
  const { memberId } = useSelector((state: RootState) => state.member);
  const [openCard, setOpenCard] = useState<boolean>(false);
  const alarmList = useAlarmQuery(memberId, openCard);

  const changeStatus = (notificationId: number) => {
    const payload = {
      memberId,
      notificationId,
    };
    mutate(payload);
    setOpenCard(!openCard);
  };

  return (
    <div className="absolute top-220 h-300 w-full bg-white">
      <div className="mx-auto mt-15 h-260 w-[90%] min-w-300 overflow-y-auto overflow-x-hidden rounded-10 border-1 border-pen-0 px-20 scrollbar-hide ">
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
