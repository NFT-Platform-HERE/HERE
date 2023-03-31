import { NFT_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation } from "react-query";
import { SubmitHospitalNFT } from "@/types/SubmitHospitalNFT";

const fetcher = (info: SubmitHospitalNFT) =>
  axios
    .post(NFT_SERVER_URL + `/nft/hospital`, {
      agencyId: info.agencyId,
      memberId: info.memberId,
      nftList: info.nftList,
    })
    .then(({ data }) => data);

const useHospitalNFTSubmit = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err, variables) => {
      console.log(err, variables);
    },
  });
};

export default useHospitalNFTSubmit;
