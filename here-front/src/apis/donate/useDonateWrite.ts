import { DONATE_SERVER_URL } from "@/utils/urls";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import * as queryKeys from "@/constants/queryKeys";
import useExpUpdate from "../member/useExpUpdate";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

const fetcher = (formData: FormData) =>
  axios
    .post(DONATE_SERVER_URL + `/board`, formData, config)
    .then(({ data }) => data);

const useDonateWrite = () => {
  const queryClient = useQueryClient();
  const { mutate } = useExpUpdate();
  const { memberId } = useSelector((state: RootState) => state.member);
  return useMutation(fetcher, {
    onSuccess: () => {
      const payload = {
        memberId,
        exp: 5,
      };
      mutate(payload);
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

export default useDonateWrite;
