import mongoose from "mongoose";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // return new Response("hola desde middelware");
  console.log("mensaje desde pages/api/entries/middleware.");
  //queremos validar el id que viene en la url
  //const { id } = req.query;//aca no tengo el query pero si el params
  const id = req.page.params?.id || ""; //si no viene ningun id digo sea ''
  //chequeo que no mande algo invalido
  const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$"); //regresa boolean

  if (!checkMongoIDRegExp.test(id)) {
    //si no hace match es decir es falso

    return new Response(JSON.stringify({ message: "Este id no es valido. " }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return NextResponse.next();
}
