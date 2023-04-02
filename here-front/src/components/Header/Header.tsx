import useCheckMemberQuery from "@/apis/member/useCheckMemberQuery";
import member, {
  deleteMemberInfo,
  getWalletAddress,
} from "@/stores/member/member";
import { RootState } from "@/stores/store";
import { connectWallet } from "@/utils/connectWallet";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MobileHeader from "./MobileHeader";
import WebHeader from "./WebHeader";

export default function Header() {
  const dispatch = useDispatch();
  const memberId = useSelector((state: RootState) => state.member.memberId);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const { account, active, activate, deactivate } = useWeb3React();

  useEffect(() => {
    if (memberId) {
      if (active && account) {
        return;
      } else {
        dispatch(deleteMemberInfo());
      }
    }
  });

  const handleConnect = () => {
    connectWallet({ account, active, activate, deactivate });
  };

  useCheckMemberQuery(walletAddress);

  useEffect(() => {
    const sseEvents = new EventSource(
      `http://localhost:9003/api/test/subscribe/${memberId}`,
    );

    sseEvents.onopen = function () {
      console.log("SSE 연결!!");
    };
    sseEvents.onerror = function (error) {
      console.log("SSE 에러", error);
    };
    sseEvents.onmessage = function (stream) {
      const parsedData = JSON.parse(stream.data);
      console.log("SSE 데이터", parsedData);
    };
  }, []);

  useEffect(() => {
    if (memberId) {
      setWalletAddress("");
    }
  }, [memberId]);

  useEffect(() => {
    if (account) {
      setWalletAddress(account);
      dispatch(getWalletAddress(account));
    }
  }, [account]);

  return (
    <div>
      <div className="mobile:hidden">
        <WebHeader handleConnect={handleConnect} />
      </div>
      <div className="hidden mobile:block">
        <MobileHeader handleConnect={handleConnect} />
      </div>
    </div>
  );
}
