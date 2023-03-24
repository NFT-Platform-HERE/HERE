import { ipfs } from "../../constants/web3Config";

export async function sendIpfs(blob: Blob | any) {
  const result = await ipfs.add(blob);

  return result.path;
}
