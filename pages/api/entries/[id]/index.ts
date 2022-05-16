import type { NextApiRequest, NextApiResponse } from "next";
//import mongoose from "mongoose";
//import { delBasePath } from "next/dist/shared/lib/router/router";
import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";

type Data = { message: string } | IEntry;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //console.log(req.query);
  //video 138 comenta porque usa middleware
  //  const { id } = req.query;
  //chequeo que no mande algo invalido
  // if (!mongoose.isValidObjectId(id)) {
  //   //si el id no es valido:
  //   return res
  //     .status(400)
  //     .json({ message: "Este Id: " + id + " no es valido." });
  // }
  switch (req.method) {
    case "GET":
      return getEntry(req, res);
    case "PUT":
      return updateEntry(req, res);
    case "DELETE": ///// esto modificado
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ message: "El método no existe." });
  }
}
//-----update
const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    //para limpiar memoria se desconecta de la bd
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay ninguna entrada con ese ID. " + id });
  }
  //necesita tomar de la req body
  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    console.error("Error en el [id]");
    await db.disconnect();
    res.status(400).json({ message: "bad request" });
  }
  //otra forma:
  // entryToUpdate.description = description;
  // entryToUpdate.status = status;
  // await entryToUpdate.save();
};
//video 136
//---getEntry
const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  //me conecto
  await db.connect();
  //toma entrada por id
  const entryToGet = await Entry.findById(id);
  //luego desconecta
  await db.disconnect();
  //si no existe devuelve
  if (!entryToGet) {
    return res.status(400).json({
      message:
        "No puede obtener entrada con el ID. " + id + " ya que no existe.",
    });
  }
  //si salio bien
  return res.status(200).json(entryToGet);
};
// ----------Delete
const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log("entre en el api/entries/id/index.ts");
  const { id } = req.query;

  await db.connect();
  const entryDBTodelete = await Entry.findByIdAndDelete(id);
  await db.disconnect();

  console.log("estoy antes del if en  api/entries/id/index.ts");

  if (!entryDBTodelete) {
    return res.status(400).json({ message: "No hay entrada con ese id " + id });
  }

  return res.status(200).json(entryDBTodelete);
};
