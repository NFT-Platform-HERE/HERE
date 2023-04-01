import { NFT_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation } from "react-query";
import { SubmitOrganizationNFT } from "@/types/SubmitOrganizationNFT";

const fetcher = (info: SubmitOrganizationNFT) =>
  axios
    .post(NFT_SERVER_URL + `/nft/agency`, {
      agencyId: info.agencyId,
      hashValue: info.hashValue,
      memberId: info.memberId,
      reason: info.reason,
      tokenId: info.tokenId,
    })
    .then(({ data }) => data);

const useOrganizationNFTSubmit = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err, variables) => {
      console.log(err, variables);
    },
  });
};

export default useOrganizationNFTSubmit;
