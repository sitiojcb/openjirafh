## Open Jira FH - app

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## seccion 9 docker

Para correr localmente, necesitamos la base de datos

```
docker-compose up -d
docker-compose down
```
##Mongo d

Recordar ver status de mongod 
systemctl status mongod
Si esta inactivo
```
systemctl start mongod
systemctl stop mongod
```

- # Mongo URL local (donde corre mi bd localmente)

```
mongo://localhost:27017/entriesdb

```

## Configurar las variables de entorno

renombrar **.env.template** a **.env**

## Llenar la base de datos con info de prueba

llamar a :

```
http://localhost:3000/api/seed

```

`

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
```
git add .
git commit -m "mensaje"
git push
a Vercel se sube desde main 
en vercel importo el proyecto y doy click en deploy
en vercel van a estar atentos a los cambios en mi repo main 
```
