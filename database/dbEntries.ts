import { isValidObjectId } from "mongoose";
import { Entry, IEntry } from "../models";
import { db } from "./";

export const getEntryById = async (id: string): Promise<IEntry | null> => {
  if (!isValidObjectId(id)) return null;
  //si es valido
  await db.connect();
  const entry = await Entry.findById(id).lean();
  await db.disconnect();

  //return entry; //comenta no va a funcionar video 150
  return JSON.parse(JSON.stringify(entry));
};
