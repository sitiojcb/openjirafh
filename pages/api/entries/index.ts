import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data = { message: string } | IEntry[] | IEntry;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    case "POST":
      return postEntry(req, res);
    case "PUT":
      return postEntry(req, res);
    default:
      //cualquier cosa que no sea GET
      return res.status(400).json({
        message: "El endpoint no existe.",
      });
  }
}

//definimos getEntries
const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: "ascending" });
  await db.disconnect();
  res.status(200).json(entries);
};
//post de entradas
const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  //necesito usar la info que viene en el body
  const { description = "" } = req.body;
  //console.log(req.body); como es backend se observa en la terminal, pero en el comienzo solo viene un espacio vacio

  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  });
  //luego de esto abrimos la conexion para guardar entradas
  try {
    await db.connect();
    await newEntry.save();
    await db.disconnect();
    return res.status(201).json(newEntry);
  } catch (error) {
    await db.disconnect();
    console.log(error);

    return res
      .status(500)
      .json({ message: "Algo salio mal, revisa la consola del servidor." });
  }
};
