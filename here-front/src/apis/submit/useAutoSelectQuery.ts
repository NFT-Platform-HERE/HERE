import { NFT_SERVER_URL } from "@/utils/urls";
import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { onClickAutoSelectBtn } from "@/stores/submit/clickAutoSelectBtn";

const fetcher = (memberId: string, count: number) =>
  axios
    .get(NFT_SERVER_URL + `/nft/${memberId}/hospital/${count}`)
    .then(({ data }) => data);

const useAutoSelectQuery = (
  memberId: string,
  count: number,
  onClick: boolean,
) => {
  const dispatch = useDispatch();

  return useQuery(
    [queryKeys.SUBMIT_AUTO_SELECT],
    () => fetcher(memberId, count),
    {
      enabled: onClick,
      onSuccess: (data) => {
        dispatch(onClickAutoSelectBtn());
      },
      onError: (err) => {
        dispatch(onClickAutoSelectBtn());
      },
    },
  );
};

export default useAutoSelectQuery;
