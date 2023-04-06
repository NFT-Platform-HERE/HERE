import useAlarmQuery from "@/apis/alarm/useAlarmQuery";
import useAlarmReadUpdate from "@/apis/alarm/useAlarmReadUpdate";
import AlarmList from "@/components/Alarm/AlarmList";
import Background from "@/components/Background/Background";
import MemberCard from "@/components/MemberCard/MemberCard";
import { RootState } from "@/stores/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Alarm } from "@/types/Alarm";
import { useDispatch } from "react-redux";
import {
  setAlarmCode,
  setNFTHistoryList,
  setOpen,
  setSenderId,
} from "@/stores/alarm/alarm";

interface Iprops {
  alarmList: any;
}

export default function WebAlarmModal({ alarmList }: Iprops) {
  const { mutate } = useAlarmReadUpdate();
  const { memberId } = useSelector((state: RootState) => state.member);

  const dispatch = useDispatch();

  const changeStatus = (
    notificationId: number,
    code: string,
    senderId: string,
    nftHistoryList: string[],
  ) => {
    const payload = {
      memberId,
      notificationId,
    };
    mutate(payload);
    if (code === "DONATED" || code === "CLOSED" || code === "HOSPITAL") {
      dispatch(setOpen());
    }
    dispatch(setAlarmCode(code));
    if (code === "HOSPITAL") {
      dispatch(setNFTHistoryList(nftHistoryList));
    } else {
      dispatch(setSenderId(senderId));
    }
  };

  return (
    <div className="absolute -left-[320px] top-60 h-280 w-400 bg-[url('/images/alarmBack.png')] bg-contain bg-no-repeat py-20 pr-24 ">
      <div className="h-230 w-365 overflow-y-auto overflow-x-hidden scrollbar-hide ">
        {alarmList?.data?.map((item: Alarm) => (
          <div key={item.notificationId}>
            <AlarmList
              text={item.content}
              onClick={() =>
                changeStatus(
                  item.notificationId,
                  item.code,
                  item.senderId,
                  item.memberIdList,
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
