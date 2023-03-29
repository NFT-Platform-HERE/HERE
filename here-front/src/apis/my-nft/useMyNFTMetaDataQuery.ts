import axios from "axios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (metaDataUrl: string) =>
  axios.get(metaDataUrl).then(({ data }) => data);

const useMyNFTMetaDataQuery = (metaDataUrl: string) => {
  return useQuery(
    [queryKeys.MYNFT_METADATA, metaDataUrl],
    () => fetcher(metaDataUrl),
    {
      enabled: !!metaDataUrl,
    },
  );
};

export default useMyNFTMetaDataQuery;
