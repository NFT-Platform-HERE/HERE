import { useMutation } from "react-query";
import { verifyNFTList } from "../blockchain/contracts";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import withReactContent from "sweetalert2-react-content";
import useHospitalAccept from "./useHospitalAccept";
import { HashValueList } from "@/types/HashValueList";

const MySwal = withReactContent(Swal);

const fetcher = (hashValueList: HashValueList[]) =>
  verifyNFTList(hashValueList).then((data) => data);

const useHospitalNftVerify = () => {
  const { mutate } = useHospitalAccept();

  return useMutation(fetcher, {
    onSuccess: (data, variables) => {
      console.log("하핫 성공!");
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
      const tokenIds = variables.map((item) => item.tokenId);
      console.log(tokenIds);
      mutate(tokenIds);
    },
    onError: () => {
      console.log("유유 error");
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

export default useHospitalNftVerify;
