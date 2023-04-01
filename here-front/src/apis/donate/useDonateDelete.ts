import { DONATE_SERVER_URL } from "@/utils/urls";
import { useMutation } from "react-query";
import axios from "axios";
import { DonationDelete } from "@/types/DonationDelete";

const fetcher = (payload: DonationDelete) =>
  axios
    .patch(DONATE_SERVER_URL + `/board`, {
      boardId: payload.boardId,
      writerId: payload.writerId,
      status: payload.status,
    })
    .then(({ data }) => data);

const useDonateDelete = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("성공!");
    },
    onError: () => {
      console.log("onERROR");
    },
  });
};

export default useDonateDelete;
