interface Iprops {
  memberId: string;
  deactivate: () => void;
}

export const unConnectWallet = ({ memberId, deactivate }: Iprops) => {
  if (memberId) {
    // 이미 연결되어있는 상태면 연결해제 함수 호출
    try {
      console.log("hi");
      deactivate();
    } catch (e) {
      console.log(e);
    }
  }
};
