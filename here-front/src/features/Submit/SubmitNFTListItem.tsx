import { addNFT } from "@/stores/submit/selectedNFT";
import { useDispatch } from "react-redux";

interface Iprops {
  id: number;
  name: string;
  registerDate: string;
}

export default function SubmitNFTListItem({ id, name, registerDate }: Iprops) {
  const dispatch = useDispatch();
  return (
    <div
      className="flex h-130 w-210 flex-col justify-between rounded-20 bg-pink-1 pt-20 pl-20 pb-20 text-18 shadow-sm"
      onClick={() => dispatch(addNFT(id))}
    >
      <div>{name}</div>
      <div>{registerDate}</div>
    </div>
  );
}
