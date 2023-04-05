interface Iprops {
  nftHistoryList: string[];
}

export default function DonateListModal({ nftHistoryList }: Iprops) {
  return <div>{nftHistoryList}</div>;
}
