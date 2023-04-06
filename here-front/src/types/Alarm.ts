export interface Alarm {
  notificationId: number;
  senderId: string;
  senderNickname: string;
  status: string;
  content: string;
  code: string;
  memberIdList: string[];
}
