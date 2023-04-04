import WebAlarmModal from "@/features/Alarm/WebAlarmModal";
import { closeWebHeaderDropdown } from "@/stores/header/webHeaderDropdown";
import { deleteMemberInfo } from "@/stores/member/member";
import { RootState } from "@/stores/store";
import { unConnectWallet } from "@/utils/unConnectWallet";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function WebHeaderDropdown() {
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

  return (
    <div className="flex h-250 w-200 flex-col items-center justify-center rounded-b-10 bg-white shadow-md">
      <div>
        <img
          src={characterImgUrl}
          className="mt-10 h-120 w-120 rounded-full"
        ></img>
      </div>
      <div className="mt-10 text-15">{nickname}</div>
      <div className="mt-10 cursor-pointer" onClick={openAlarm}>
        <img src="/icons/alarm.svg"></img>
      </div>
      {openAlarmModal && <WebAlarmModal />}

      <div className="mt-10 cursor-pointer text-15" onClick={Logout}>
        LOGOUT
      </div>
    </div>
  );
}
