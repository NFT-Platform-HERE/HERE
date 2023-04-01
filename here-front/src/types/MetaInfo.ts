import { Blood, NftType, RhType } from "@/enum/statusType";

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
  bloodAmount: string;
  blood: Blood;
  rhType: RhType;
}
