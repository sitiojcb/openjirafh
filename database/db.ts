import mongoose from "mongoose";

/*
 *
 * https://mongoosejs.com/
 * * status propias de mongoose:
 * 0 == disconnected
 * 1 == connected
 * 2 == connecting
 * 3 == disconnecting
 */
const mongoConnection = {
  isConnected: 0,
};
//mongoose.connect('mongodb://user:pass@localhost:port/database', { autoIndex: false });

export const connect = async () => {
  // if (mongoConnection.isConnected === 1) es igual a
  if (mongoConnection.isConnected) {
    console.log("estaba conectado ");
    return;
  }
  //necesito chequear si hay conexion y de ser asi usar esa
  if (mongoose.connections.length > 0) {
    //significa esta conectado pero todavia no se que numero...
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if (mongoConnection.isConnected === 1) {
      console.log("usando conexion anterior ");
      return;
    }
    //si llego aca es porque no tengo conexion == 1
    await mongoose.disconnect();
  }
  //mongodb://user:pass@localhost:port/database comenta es la cadena de conexion y debe de ir en una variable de entorno porque puede ser dinamico !
  //por eso en su lugar usa process.env.MONGO_URL
  await mongoose.connect(process.env.MONGO_URL || "");
  //si paso lo de arriba significa que estoy conectado, es decir igual a 1
  mongoConnection.isConnected = 1;
  console.log(
    "estoy en database/db y estoy conectado a mongo ",
    process.env.MONGO_URL
  );
};

export const disconnect = async () => {
  //si estoy conectado en desarrollo no me quiero desconectar video 128
  if (process.env.NODE_ENV === "development") return;

  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();
  mongoConnection.isConnected = 0; //agrega en video 152
  console.log("estoy en database/db y estoy desconectado de mongodb");
  // if (mongoConnection.isConnected === 0) {
  //   await mongoose.disconnect();
  //   console.log("estoy desconectado de mongodb");
  // }
};
