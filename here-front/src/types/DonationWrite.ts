export interface DonationWrite {
  memberId: string;
  title: string;
  content: string;
  deadline: string;
  goalQuantity: number;
  imgUrlList?: string[];
}
