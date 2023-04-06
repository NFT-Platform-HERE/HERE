import { NFT_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const fetcher = (memberId: string, serialNumber: string) =>
  axios
    .get(NFT_SERVER_URL + `/nft/paper-bd-cert/${memberId}/${serialNumber}`)
    .then(({ data }) => {
      return data.data;
    });

const useRegisterPaperNftQuery = (memberId: string, serialNumber: string) => {
  return useQuery(
    queryKeys.REGISTER_PAPER_NFT,
    () => fetcher(memberId, serialNumber),
    {
      refetchOnWindowFocus: false,
      enabled: false,

      onError: (err) => {
        MySwal.fire({
          icon: "error",
          title: "등록된 헌혈 정보를 찾을 수 없습니다.",
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            title: "text-20 font-medium",
            popup: "w-440 h-260",
          },
        });
      },
    },
  );
};

export default useRegisterPaperNftQuery;
