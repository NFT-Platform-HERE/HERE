import { NFT_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (tokenIdList: number[]) =>
  axios
    .patch(NFT_SERVER_URL + `/organ/hospital`, {
      tokenIdList,
    })
    .then(({ data }) => data.data);

const useHospitalAccept = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      return queryClient.invalidateQueries(queryKeys.ORGANIZATION_NFT_LIST);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export default useHospitalAccept;