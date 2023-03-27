import { ipfs } from "../../constants/web3Config";

import { IPFS_SERVER_METAINFO_URL } from "../../utils/urls";

export async function sendIpfs(blob: Blob | any) {
  const result = await ipfs.add(blob);

  const metaInfoUrl = IPFS_SERVER_METAINFO_URL + result.path;

  return metaInfoUrl;
}
