import { DONATE_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { Donation } from "./../../types/Donation";

interface Iprops {
  boardId: number;
}

const fetcher = (boardId: number) =>
  axios.get(DONATE_SERVER_URL + `/board/${boardId}`).then(({ data }) => {
    const response = data.data as Donation[];
    return response;
  });

const useDonateDetailQuery = ({boardId}: Iprops) => {
  return useQuery([queryKeys.DONATE_DETAIL, boardId], () => fetcher(boardId), {
    suspense: true,
  });
};

export default useDonateDetailQuery;
