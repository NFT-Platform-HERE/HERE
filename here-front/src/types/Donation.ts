export interface Donation {
  boardId: number;
  title: string;
  nickname: string;
  boardImgUrl?: string;
  status: boolean;
  dDay: string;
  percentage: number;
}
