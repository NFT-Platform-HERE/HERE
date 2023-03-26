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
  const alarmList = useAlarmQuery(memberId);
  const [openCard, setOpenCard] = useState<boolean>(false);

  const changeStatus = (notificationId: number) => {
    console.log("notificationId", notificationId);
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
        {alarmList.data &&
          alarmList.data.map((item: Alarm) => {
            <AlarmList
              key={item.notificationId}
              text={item.content}
              status={item.status}
              onClick={() => changeStatus(item.notificationId)}
            />;
            {
              openCard && <MemberCard senderId={item.senderId} />;
            }
            {
              openCard && <Background onClick={() => setOpenCard(!openCard)} />;
            }
          })}
        <AlarmList
          text={
            "당신의 소중한 혈액증서가 사용되었습니다. [사용처- 충남대학교 병원]"
          }
          status={"INACTIVE"}
          onClick={() => changeStatus(3)}
        />{" "}
        <AlarmList
          text={
            "당신의 소중한 혈액증서가 사용되었습니다. [사용처- 충남대학교 병원]"
          }
          status={"ACTIVE"}
          onClick={() => changeStatus(3)}
        />{" "}
        <AlarmList
          text={
            "당신의 소중한 혈액증서가 사용되었습니다. [사용처- 충남대학교 병원]"
          }
          status={"INACTIVE"}
          onClick={() => changeStatus(3)}
        />{" "}
      </div>
    </div>
  );
}
