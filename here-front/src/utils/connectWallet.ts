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

  // if (active && account) {
  //   // 이미 연결되어있는 상태면 연결해제 함수 호출
  //   console.log("여깁니다");
  //   deactivate();
  //   return;
  // }
  // activate 함수로, App에서 만든 Injected란 이름의 connector 인스턴스를 넘겨준다
  activate(Injected);

  const chainId = await getChainId();

  if (chainId !== SSAFYNETWORK) {
    try {
      changeNetwork();
    } catch {}
  }
};

const getChainId = async () => {
  const chainId = await window.ethereum.request({
    method: "eth_chainId",
  });
  return chainId;
};

const changeNetwork = async () => {
  await window.ethereum
    .request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: SSAFYNETWORK }],
    })
    .catch((e: any) => {
      if (e.code === 4902) {
        addNetwork();
      }
    });
};

const addNetwork = async () => {
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: SSAFYNETWORK,
        chainName: "SSAFY",
        rpcUrls: ["https://rpc.ssafy-blockchain.com"],
        nativeCurrency: {
          name: "SSF TOKEN",
          decimals: 18,
          symbol: "SSF",
        },
      },
    ],
  });
};
