export interface DonationUpdate {
  boardId: number;
  writerId: string;
  title: string;
  content: string;
  deadline?: string;
  goalQuantity?: number;
  imgUrlList?: string[];
}
