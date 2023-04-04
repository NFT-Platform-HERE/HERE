import { NFT_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (tokenId: number) =>
  axios
    .patch(NFT_SERVER_URL + `/organ/agency`, {
      tokenId,
    })
    .then(({ data }) => data.data);

const useAgencyAccept = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      return queryClient.invalidateQueries(queryKeys.ORGANIZATION_NFT_LIST);
    },
  });
};

export default useAgencyAccept;
