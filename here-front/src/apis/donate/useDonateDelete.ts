import { DONATE_SERVER_URL } from "@/utils/urls";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { DonationDelete } from "@/types/DonationDelete";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (payload: DonationDelete) =>
  axios
    .patch(DONATE_SERVER_URL + `/board`, {
      boardId: payload.boardId,
      writerId: payload.writerId,
      status: payload.status,
    })
    .then(({ data }) => data);

const useDonateDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      return queryClient.invalidateQueries(queryKeys.DONATE_DETAIL);
    },
  });
};

export default useDonateDelete;
