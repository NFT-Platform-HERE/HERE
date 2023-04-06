import { NftType } from "@/enum/statusType";

export interface Mint {
  bdType: string;
  hashValue: string;
  imgUrl: string;
  issuerId: string;
  ownerId: string;
  place: string;
  tokenId: number;
  nftType: NftType;
  createdDate: string;
}
