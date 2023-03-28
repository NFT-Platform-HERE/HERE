import { BoardStatus } from "@/utils/statusType";

export interface DonationDelete {
  boardId: number;
  writerId: string;
  status: BoardStatus;
}
