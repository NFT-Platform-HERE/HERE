import { BoardStatus } from "@/utils/statusType";

export interface Donation {
  boardId: number;
  title: string;
  nickname: string;
  boardImgUrl?: string;
  status: BoardStatus;
  dDay: string;
  percentage: number;
}
