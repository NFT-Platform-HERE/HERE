import { DONATE_SERVER_URL } from "@/utils/urls";
import { useMutation } from "react-query";
import axios from "axios";
import { DonationUpdate } from "@/types/DonationUpdate";

const fetcher = (payload: DonationUpdate) =>
  axios
    .patch(DONATE_SERVER_URL + `/board/update`, {
      boardId: payload.boardId,
      writerId: payload.writerId,
      title: payload.title,
      content: payload.content,
      deadline: payload.deadline,
      goalQuantity: payload.goalQuantity,
      imgUrlList: payload.imgUrlList,
    })
    .then(({ data }) => data);

const useDonateUpdate = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("성공!");
    },
    onError: () => {
      console.log("onERROR");
    },
  });
};

export default useDonateUpdate;
