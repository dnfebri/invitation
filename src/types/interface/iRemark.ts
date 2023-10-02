import { TReply } from "../tReply";

export interface IRemark {
  id: number;
  note: string;
  author: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  reply: TReply[];
}
