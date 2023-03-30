export interface SubmitHospitalNFT {
  agencyId: string;
  memberId: string;
  nftList: { hashValue: string; tokenId: number }[];
}
