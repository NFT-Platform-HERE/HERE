export interface DonationUpdate {
  boardId: string;
  writerId: string;
  title: string;
  content: string;
  deadline: string;
  goalQuantity: number;
  imgUrlList?: string[];
}
