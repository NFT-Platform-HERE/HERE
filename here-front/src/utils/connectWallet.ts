import { InjectedConnector } from "@web3-react/injected-connector";
import { AbstractConnector } from "@web3-react/abstract-connector";

interface Iprops {
  account: string | null | undefined;
  active: boolean;
  activate: (
    connector: AbstractConnector,
    onError?: (error: Error) => void,
    throwErrors?: boolean,
  ) => Promise<void>;
  deactivate: () => void;
}

const SSAFYNETWORK = "0x79f5";

export const connectWallet = async ({
  account,
  active,
  activate,
  deactivate,
}: Iprops) => {
  const Injected = new InjectedConnector({});
  if ((window as any).ethereum === undefined) {
    // 지갑이 설치 안되어있으면 설치 페이지를 오픈한다. 일단 메타마스크만.
    window.open(
      `https://metamask.app.link/dapp/${window.location.host}`,
      "_blank",
    );
    return;
  }

  if (active && account) {
    deactivate();
    // 이미 연결되어있는 상태면 연결해제 함수 호출
  }
  activate(Injected);
  // activate 함수로, App에서 만든 Injected란 이름의 connector 인스턴스를 넘겨준다

  const chainId = await window.ethereum.request({
    method: "eth_chainId",
  });
  console.log(chainId);
  if (chainId !== SSAFYNETWORK) {
    try {
      console.log("ddd");
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SSAFYNETWORK }],
      });
    } catch (e: any) {
      console.log("error", e);
      console.log("error code?", e.code);
      if (e.code === 4902) {
        // metamask에 해당 네트워크가 없는 경우 추가해주기
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: SSAFYNETWORK,
              chainName: "SSAFY",
              rpcUrls: ["https://rpc.ssafy-blockchain.com"],
              // blockExplorerUrls: ["https://testnetexplorer.metadium.com"],
              nativeCurrency: {
                name: "SSF TOKEN",
                decimals: 18,
                symbol: "SSF",
              },
            },
          ],
        });
      }
      return;
    }
  }
};
