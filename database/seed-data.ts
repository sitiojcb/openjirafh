interface SeedData {
  //lo llama elemento padre
  entries: SeedEntry[];
  //comenta podriamos agregar users: string;
}
interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Pendiente algo como descripcion",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "In-Progress: algo como descripcion para el segundo",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description: "Finished: algo como descripcion para el tercero",
      status: "finished",
      createdAt: Date.now() - 1000000,
    },
  ],
};
