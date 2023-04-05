import { useMutation } from "react-query";
import { verifyNFTList } from "../blockchain/contracts";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import withReactContent from "sweetalert2-react-content";
import useHospitalAccept from "./useHospitalAccept";
import { HashValueList } from "@/types/HashValueList";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const MySwal = withReactContent(Swal);

const fetcher = (hashValueList: HashValueList[]) =>
  verifyNFTList(hashValueList).then((data) => data);

const useHospitalNftVerify = () => {
  const { mutate } = useHospitalAccept();
  const organizationId = useSelector(
    (state: RootState) => state.member.organizationId,
  );

  return useMutation(fetcher, {
    onSuccess: (data, variables) => {
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
      const verifyTokenIds = tokenIds.filter((token, idx) => {
        return data[idx] && token;
      });
      mutate({
        tokenIdList: verifyTokenIds,
        agencyId: organizationId,
      });
    },
    onError: () => {
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
