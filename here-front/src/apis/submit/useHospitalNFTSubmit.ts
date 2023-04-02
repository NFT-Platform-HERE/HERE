import { NFT_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { SubmitHospitalNFT } from "@/types/SubmitHospitalNFT";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (info: SubmitHospitalNFT) =>
  axios
    .post(NFT_SERVER_URL + `/nft/hospital`, {
      agencyId: info.agencyId,
      memberId: info.memberId,
      hashValueList: info.nftList,
    })
    .then(({ data }) => data);

const useHospitalNFTSubmit = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log(data);
      return queryClient.invalidateQueries(queryKeys.SUBMIT_NFT_LIST);
    },
    onError: (err, variables) => {
      console.log(err, variables);
    },
  });
};

export default useHospitalNFTSubmit;
