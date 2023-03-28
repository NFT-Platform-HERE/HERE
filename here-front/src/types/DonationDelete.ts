import { BoardStatus } from "@/utils/statusType";

export interface DonationDelete {
  boardId: string;
  writerId: string;
  status: BoardStatus;
}
