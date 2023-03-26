import useAlarmQuery from "@/apis/alarm/useAlarmQuery";
import useAlarmReadUpdate from "@/apis/alarm/useAlarmReadUpdate";
import AlarmList from "@/components/Alarm/AlarmList";
import Background from "@/components/Background/Background";
import MemberCard from "@/components/MemberCard/MemberCard";
import { RootState } from "@/stores/store";
import { useState } from "react";
import { useSelector } from "react-redux";

interface AlarmList {
  notificationId: number;
  senderId: string;
  senderNickname: string;
  status: string;
  content: string;
}

export default function AlarmModal() {
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
    <div className="absolute -left-[320px] top-60 h-280 w-400 bg-[url('/images/alarmBack.png')] bg-contain bg-no-repeat  py-20 pr-24 ">
      <div className="h-230 w-365 overflow-y-auto overflow-x-hidden scrollbar-hide ">
        {alarmList.data &&
          alarmList.data.map((item: AlarmList) => {
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
          text={"언도 님이 헌혈증서 3개를 기부하셨습니다."}
          status={"INACTIVE"}
          onClick={() => changeStatus(1)}
        />
        <AlarmList
          text={"[헌혈증서 급구합니다] 게시글이 마감되었습니다."}
          status={"ACTIVE"}
          onClick={() => changeStatus(2)}
        />
        <AlarmList
          text={
            "당신의 소중한 혈액증서가 사용되었습니다. [사용처- 충남대학교 병원]"
          }
          status={"INACTIVE"}
          onClick={() => changeStatus(3)}
        />
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
          status={"INACTIVE"}
          onClick={() => changeStatus(3)}
        />{" "}
        <AlarmList
          text={
            "당신의 소중한 혈액증서가 사용되었습니다. [사용처- 충남대학교 병원]"
          }
          status={"INACTIVE"}
          onClick={() => changeStatus(3)}
        />
      </div>
    </div>
  );
}
