import { useMutation } from "react-query";
import { verifyNFT } from "../blockchain/contracts";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import withReactContent from "sweetalert2-react-content";
import useAgencyAccept from "./useAgencyAccept";

interface Iprops {
  tokenId: number;
  hash: string;
}

const MySwal = withReactContent(Swal);

const fetcher = (payload: Iprops) =>
  verifyNFT(payload.tokenId, payload.hash).then((data) => data);

const useAgencyNftVerity = () => {
  const { mutate } = useAgencyAccept();

  return useMutation(fetcher, {
    onSuccess: (data, variables) => {
      console.log("성공!");
      MySwal.fire({
        icon: "success",
        title: "진위 여부가 확인되었습니다",
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          title: "text-20 font-medium",
          popup: "w-440 h-260",
        },
      });
      mutate(variables.tokenId);
    },
    onError: () => {
      console.log("error");
      MySwal.fire({
        icon: "error",
        title: "진위 여부 확인에 실패하였습니다",
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          title: "text-20 font-medium",
          popup: "w-440 h-260",
        },
      });
    },
  });
};

export default useAgencyNftVerity;
