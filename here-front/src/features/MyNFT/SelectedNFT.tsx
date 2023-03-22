import Background from "@/components/Background/Background";
import NFTCardBack from "@/components/Card/NFTCardBack";
import { selectNFT } from "@/stores/myNFT/selectedNFT";
import { useDispatch } from "react-redux";

export default function SelectedNFT() {
  const dispatch = useDispatch();
  return (
    <div>
      <Background onClick={() => dispatch(selectNFT(0))} />
      <div className="fixed top-[calc(50%-175px)] left-[calc(50%-283px)] z-30">
        <NFTCardBack height={350} fontSize={18}></NFTCardBack>
      </div>
    </div>
  );
}
