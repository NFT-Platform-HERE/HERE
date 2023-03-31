export interface SubmitHospitalNFT {
  agencyId: string;
  memberId: string;
  nftList: { tokenId: number; hashValue: string }[];
}
