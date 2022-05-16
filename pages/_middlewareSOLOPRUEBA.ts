import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // return new Response("hola desde middelware");
  console.log("mensaje desde pages/middleware.");
  return NextResponse.next();
}
