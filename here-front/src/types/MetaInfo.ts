import { NftType } from "@/utils/statusType";

export interface MetaInfo {
  name: string;
  gender: string;
  type: string;
  walletAddress: string;
  birth: string;
  createdDate: string;
  place: string;
  imageURL: string;
  nftType: NftType;
}
