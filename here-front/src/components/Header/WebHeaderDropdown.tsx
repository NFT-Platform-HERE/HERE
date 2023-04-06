import useAlarmQuery from "@/apis/alarm/useAlarmQuery";
import WebAlarmModal from "@/features/Alarm/WebAlarmModal";
import { closeWebHeaderDropdown } from "@/stores/header/webHeaderDropdown";
import { deleteMemberInfo } from "@/stores/member/member";
import { RootState } from "@/stores/store";
import { unConnectWallet } from "@/utils/unConnectWallet";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface Iprops {
  dropDown: boolean;
}

export default function WebHeaderDropdown({ dropDown }: Iprops) {
  const dispatch = useDispatch();
  const { nickname, characterImgUrl, memberId } = useSelector(
    (state: RootState) => state.member,
  );

  const { deactivate } = useWeb3React();
  const Logout = () => {
    unConnectWallet({ memberId, deactivate });
    dispatch(deleteMemberInfo());
    dispatch(closeWebHeaderDropdown());
  };
  const [openAlarmModal, setOpenAlarmModal] = useState<boolean>(false);
  const openAlarm = () => {
    setOpenAlarmModal(!openAlarmModal);
  };

  useEffect(() => {
    if (!dropDown) {
      setOpenAlarmModal(false);
    }
  }, [dropDown]);

  const alarmList = useAlarmQuery(memberId, openAlarmModal);

  return (
    <div className="flex h-250 w-200 flex-col items-center justify-center rounded-b-10 bg-white shadow-md">
      <div>
        <img
          src={characterImgUrl}
          className="mt-10 h-120 w-120 rounded-full"
        ></img>
      </div>
      <div className="mt-10 text-15">{nickname}</div>
      <div className="relative mt-10 cursor-pointer" onClick={openAlarm}>
        <img src="/icons/alarm.svg" />
        {alarmList?.data && alarmList?.data?.length !== 0 && (
          <div className="absolute top-0 right-0 h-10 w-10 animate-pulse rounded-50 bg-red-2"></div>
        )}
      </div>
      {openAlarmModal && <WebAlarmModal alarmList={alarmList} />}

      <div className="mt-10 cursor-pointer text-15" onClick={Logout}>
        LOGOUT
      </div>
    </div>
  );
}
