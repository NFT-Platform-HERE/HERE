import { NFT_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (memberId: string, serialNumber: string) =>
  axios
    .get(NFT_SERVER_URL + `/nft/paper-bd-cert`, {
      params: {
        memberId: memberId,
        serialNumber: serialNumber,
      },
    })
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
      onSuccess: (data) => {
        console.log("Success");
      },
      onError: (err) => {
        console.log("error!", err);
      },
    },
  );
};

export default useRegisterPaperNftQuery;
