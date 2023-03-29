import useMyNFTMetaDataQuery from "@/apis/my-nft/useMyNFTMetaDataQuery";
import Background from "@/components/Background/Background";
import NFTCardBack from "@/components/Card/NFTCardBack";
import { selectNFT } from "@/stores/myNFT/selectedNFT";
import { RootState } from "@/stores/store";
import { useDispatch, useSelector } from "react-redux";
import useMyNFTMetaURLQuery from "./../../apis/my-nft/useMyNFTMetaURLQuery";

export default function MyNFTDetailBackModal() {
  const dispatch = useDispatch();
  const tokenId = useSelector((state: RootState) => state.selectedNFT.tokenId);

  const { data } = useMyNFTMetaURLQuery(tokenId);
  const result = useMyNFTMetaDataQuery(data);

  console.log("result", result.data);

  return (
    <div>
      <Background onClick={() => dispatch(selectNFT(0))} />
      <div className="fixed top-[calc(50%-175px)] left-[calc(50%-283px)] z-30 mobile:hidden">
        <NFTCardBack height={350} fontSize={18}></NFTCardBack>
      </div>
      <div className="hidden mobile:fixed mobile:top-[calc(50%-105px)] mobile:left-[calc(50%-169px)] mobile:z-30 mobile:block">
        <NFTCardBack height={210} fontSize={12}></NFTCardBack>
      </div>
    </div>
  );
}
