export interface IGuest {
  id: number;
  username: string;
  name: string;
  read: number;
  attend: boolean | null;
}
