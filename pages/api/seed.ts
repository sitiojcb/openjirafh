import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedData } from "../../database";
import { Entry } from "../../models";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //si esta en produccion no se debe ejecutar
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({
      message: "Ud no tiene acceso a este servicio.",
    });
  }
  await db.connect();
  //a partir de estar conectados podemos interactuar con la base de datos!
  await Entry.deleteMany(); //ojo si no paso condiciones vuela toda la base de datos db
  //ahora insertamos nuevamente
  await Entry.insertMany(seedData.entries);
  //una vez insertados me desconecto
  await db.disconnect();
  res.status(200).json({ message: "Proceso realizado correctamente." });
}
