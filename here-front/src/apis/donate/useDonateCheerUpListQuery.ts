import { DONATE_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (boardId: number, memberId: string) =>
  axios
    .get(DONATE_SERVER_URL + `/board/msg/${boardId}/${memberId}`)
    .then(({ data }) => {
      const response = data.data;
      return response;
    });

const useDonateCheerUpListQuery = (boardId: number, memberId: string) => {
  return useQuery(
    queryKeys.DONATE_CHEER_UP_LIST,
    () => fetcher(boardId, memberId),
    {
      suspense: true,
      enabled: !!memberId,
    },
  );
};

export default useDonateCheerUpListQuery;
