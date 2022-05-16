export type EntryStatus = "pending" | "in-progress" | "finished";
//cuando no va a crecer no hace falta interface

export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  // status: string; //pending in progress finished
  status: EntryStatus;
}
