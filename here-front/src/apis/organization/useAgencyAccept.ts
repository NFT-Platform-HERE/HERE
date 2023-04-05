import { NFT_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { AgencyAccept } from "@/types/AgencyAccept";

const fetcher = (payload: AgencyAccept) =>
  axios
    .patch(NFT_SERVER_URL + `/organ/agency`, {
      tokenId: payload.tokenId,
      agencyId: payload.agencyId,
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
