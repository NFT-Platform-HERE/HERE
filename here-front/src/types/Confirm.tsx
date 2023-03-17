export interface Confirm {
  memberName: string;
  reason?: string;
  count?: number;
  createdDate: string;
  hashValueList?: [hashValue: string]; // 나중에 물음표 빼기
}
