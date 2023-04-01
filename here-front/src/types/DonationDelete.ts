import { BoardStatus } from "@/enum/statusType";

export interface DonationDelete {
  boardId: number;
  writerId: string;
  status: BoardStatus;
}
