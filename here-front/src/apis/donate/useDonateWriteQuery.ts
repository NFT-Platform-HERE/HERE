import { DONATE_SERVER_URL } from "@/utils/urls";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import * as queryKeys from "@/constants/queryKeys";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

const fetcher = (formData: FormData) =>
  axios
    .post(DONATE_SERVER_URL + `/board`, formData, config)
    .then(({ data }) => data);

const useDonateWriteQuery = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("성공!");
      return queryClient.invalidateQueries([
        queryKeys.DONATE_LIST,
        queryKeys.DONATE_DEADLINE_LIST,
      ]);
    },
    onError: () => {
      console.log("onERROR");
    },
  });
};

export default useDonateWriteQuery;
