import useMyNFTMetaDataQuery from "@/apis/my-nft/useMyNFTMetaDataQuery";
import useMyNFTMetaURLQuery from "@/apis/my-nft/useMyNFTMetaURLQuery";
import Background from "@/components/Background/Background";
import NFTCardBack from "@/components/Card/NFTCardBack";

interface Iprops {
  tokenId: number;
  onClick: (tokenId: number) => void;
}

export default function RedCrossNFTModal({ tokenId, onClick }: Iprops) {
  const MetaUrl = useMyNFTMetaURLQuery(tokenId);
  const NFTDetail = useMyNFTMetaDataQuery(MetaUrl.data);

  return (
    <div>
      <Background onClick={() => onClick(0)} />
      <div className="fixed top-[calc(50%-175px)] left-[calc(50%-283px)] z-30">
        <NFTCardBack height={350} fontSize={18} detail={NFTDetail.data} />
      </div>
    </div>
  );
}
