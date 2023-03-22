import useCheckMemberQuery from "@/hooks/member/useCheckMemberQuery";
import { connectWallet } from "@/utils/connectWallet";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import MobileHeader from "./MobileHeader";
import WebHeader from "./WebHeader";

export default function Header() {
  const [walletAddress, setWalletAddress] = useState<string>("");

  const { account, active, activate, deactivate } = useWeb3React();

  const handleConnect = () => {
    connectWallet({ account, active, activate, deactivate });
  };

  useCheckMemberQuery(walletAddress);

  useEffect(() => {
    if (account) {
      setWalletAddress(account);
    }
  }, [account]);

  return (
    <div>
      <div className="mobile:hidden">
        <WebHeader
          walletAddress={walletAddress}
          handleConnect={handleConnect}
        />
      </div>
      <div className="hidden mobile:block">
        <MobileHeader
          walletAddress={walletAddress}
          handleConnect={handleConnect}
        />
      </div>
    </div>
  );
}
