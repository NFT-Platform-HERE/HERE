import useMyNFTMetaDataQuery from "@/apis/my-nft/useMyNFTMetaDataQuery";
import useMyNFTMetaURLQuery from "@/apis/my-nft/useMyNFTMetaURLQuery";
import useAgencyNftVerity from "@/apis/organization/useAgencyNftVerity";
import Background from "@/components/Background/Background";
import CommonBtn from "@/components/Button/CommonBtn";
import NFTCardBack from "@/components/Card/NFTCardBack";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";

interface Iprops {
  onClick: (idx: number) => void;
}

export default function AgencyNFTModal({ onClick }: Iprops) {
  const { tokenId, hash } = useSelector(
    (state: RootState) => state.organization,
  );
  const MetaUrl = useMyNFTMetaURLQuery(tokenId);
  const NFTDetail = useMyNFTMetaDataQuery(MetaUrl.data);
  const { mutate } = useAgencyNftVerity();

  const checkNFT = () => {
    const payload = {
      tokenId,
      hash,
    };
    mutate(payload);
    onClick(0);
  };

  return (
    <>
      <Background onClick={() => onClick(0)} />
      <div className="fixed top-[50%] left-[50%] z-30 translate-x-[-50%] translate-y-[-50%] rounded-10 bg-pink-0 px-100 pt-60 pb-40">
        <NFTCardBack height={350} fontSize={18} detail={NFTDetail.data} />
        <div className="mt-30">
          <CommonBtn
            width={200}
            height={50}
            fontSize={16}
            children={"NFT 진위 여부 확인"}
            isDisabled={false}
            onClick={checkNFT}
          />
        </div>
      </div>
    </>
  );
}
