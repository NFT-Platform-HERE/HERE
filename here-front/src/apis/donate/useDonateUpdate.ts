import { DONATE_SERVER_URL } from "@/utils/urls";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import * as queryKeys from "@/constants/queryKeys";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

const fetcher = (formData: FormData) =>
  axios
    .patch(DONATE_SERVER_URL + `/board/update`, formData, config)
    .then(({ data }) => data);

const useDonateUpdate = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("Update 성공", data);
      const queryClient = useQueryClient();
      return queryClient.invalidateQueries(queryKeys.DONATE_DETAIL);
    },
    onError: () => {
      console.log("onERROR");
    },
  });
};

export default useDonateUpdate;
