import WebAlarmModal from "@/features/Alarm/WebAlarmModal";
import { closeWebHeaderDropdown } from "@/stores/header/webHeaderDropdown";
import { deleteMemberInfo } from "@/stores/member/member";
import { RootState } from "@/stores/store";
import { unConnectWallet } from "@/utils/unConnectWallet";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function WebHeaderDropdown() {
  const dispatch = useDispatch();
  const { nickname, characterImgUrl } = useSelector(
    (state: RootState) => state.member,
  );
  const { account, active, deactivate } = useWeb3React();
  const Logout = () => {
    unConnectWallet({ account, active, deactivate });
    dispatch(deleteMemberInfo());
    dispatch(closeWebHeaderDropdown());
  };
  const [openAlarmModal, setOpenAlarmModal] = useState<boolean>(false);
  const openAlarm = () => {
    setOpenAlarmModal(!openAlarmModal);
  };
  return (
    <div className="z-40 flex h-250 w-200 flex-col items-center justify-center rounded-b-10 bg-white shadow-md">
      <div>
        <img
          src={characterImgUrl}
          className="mt-10 h-120 w-120 rounded-full"
        ></img>
      </div>
      <div className="mt-10 text-15">{nickname}</div>
      <div className="mt-10" onClick={openAlarm}>
        <img src="/icons/alarm.svg"></img>
      </div>
      {openAlarmModal && <WebAlarmModal />}

      <div className="mt-10 text-15" onClick={Logout}>
        LOGOUT
      </div>
    </div>
  );
}
