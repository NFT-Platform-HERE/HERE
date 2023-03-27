import { NftType } from "@/utils/statusType";

export interface Mint {
  bdType: string;
  hashValue: string;
  imgUrl: string;
  issuerId: string;
  ownerId: string;
  place: string;
  tokenId: 0;
  type: NftType;
}
