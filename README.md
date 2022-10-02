# gama-store-backend

Sistema para gestionar ventas por retail.

🟢 **Live Frontend:** https://gamastore-one.vercel.app

🟢 **Live Backend:** https://gamastore-one.herokuapp.com
🟢 **Live Backend Doc:** https://gamastore-one.herokuapp.com/docs

## 🚀 Empezando

### 🟡 Pre-requisitos

- node
- heroku
- docker

### 🔥 Instalación

1. Clonar este repo
2. Instalar dependencias: `npm install`
3. Inicias los servicios necesarios en docker
4. Iniciar el servidor de desarrollador: `npm run dev`
5. Usuario por default: `hectormr`
6. Contraseña por default: `123456`
7. Crear o actualizar documentación: `npm run swagger-autogen`

> Notas: este proyecto corre en: **localhost:3003**

### 🖥️ Iniciar los servicios necesarios

- Iniciar postgres: `docker-compose up -d pgadmin`
- Iniciar postgres: `docker-compose up -d phpmyadmin`
- Visualizar los servicios en ejecución: `docker-compose ps`
- Detener los servicios en ejecución: `docker-compose down`
- Correr la migración de las bases de datos en local: `npm run migrations:run`

## 🚀 Producción

- Una vez instaladas las dependencias, puede realizar la compilación: `npm run start`

### 🖥️ Deploy to Heroku

#### Instalar Docker

- Instalar Heroku CLI: `curl https://cli-assets.heroku.com/install.sh | sh`

#### Conexión remota

- Iniciar sesión con tu cuenta: `heroku login`
- Agregar las conexiones remotas de heroku con proyecto ya existente: `heroku git:remote -a proveedorarem-backend`
  - Si quieres que Heroku cree una aplicación con nombre aleatorio: `heroku create`
- Verificar las conexiones creadas: `git remote -v`
- Crear y gestionar la base de datos postgres en heroku: `heroku addons:create heroku-postgresql:hobby-dev`
- Verificar la versión de postgres: `heroku pg:info`
- Agregar todos los cambios: `git add .`
- Guardar todos los cambios: `git commit -m "[ADD] example"`

#### Deploy

- Enviar todos los archivos al git de heroku: `git push heroku production:main`
- Ingresar variables de entorno: `heroku config:set agregar con especios todas las variables de entorno`

#### Migraciones de base de datos

- Generar la migración de las bases de datos en heroku: `heroku run npm run migrations:generate --name`
- Correr la migración de las bases de datos en heroku: `heroku run npm run migrations:run`
- Revertir la última migración de las bases de datos en heroku: `heroku run npm run migrations:revert`
- Eliminar las migraciones de las bases de datos en heroku: `heroku run npm run migrations:delete`

#### Documentation

- Crear o actualizar documentación: `heroku run npm run swagger-autogen`

### Importar base de datos de Heroku a Postgres (base de datos local)

- Capture la copia de seguridad de la base de datos de Heroku: `heroku pg:backups:capture`
- Descarga la base de datos de Heroku: `heroku pg:backups:download`
- Importe latest.dump a Postgres (su base de datos local): `docker exec -i postgres_store_gama pg_restore --verbose --clean --no-acl --no-owner -U hectormr206 -d rem < latest.dump`

### Exportar base de datos de Postgres (base de datos local) a Heroku

- Hay 2 métodos para exportar bases de datos de Postgres a Heroku.

  - Método 1 : crear un archivo de volcado desde Postgres y exportarlo a Heroku

  - Método 2 : enviar directamente la base de datos de Postgres a Heroku

### 🟡 Pre-requisitos

- Tener instalada la misma versión postgresql de Heroku localmente:
  - sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
  - wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
  - sudo apt-get update
  - sudo apt-get -y install postgresql-13
- La base de datos de Heroku no debe contener ninguna tabla

#### Método 1:

- Paso 1: crear archivo de volcado de Postgres usando el pg_dumpcomando:

`docker exec -i postgres_store_gama pg_dump --no-acl --no-owner -U hectormr206 -d store_gama > latest-local.dump`

- Paso 2: exportar el archivo de volcado a Heroku:

`PGUSER=hectormr206 PGPASSWORD=123456 PGHOST=127.0.0.1 heroku pg:psql -a proveedorarem-backend < latest-local.dump`

#### Método 2:

- Exportar la base de datos de Postgres (base de datos local) a Heroku directamente:

`PGUSER=hectormr206 PGPASSWORD=123456 PGHOST=127.0.0.1 heroku pg:push store_gama DATABASE_URL -a gamastore-backend`

#### Método desde pgadmin remoto:

`/usr/local/pgsql-14/pg_dump --file "/var/lib/pgadmin/storage/hectormartinez_gamastore.com/gamastore_backup" --host "ec2-44-196-174-238.compute-1.amazonaws.com" --port "5432" --username "xgubpvwrsnfrqt" --no-password --verbose --format=c --blobs "dc33oeg63iin7d"`

## Asociaciones

A: "User Details"
B: "User"

- A.belongsTo(B)
- A.hasOne(B): B necesita foreign key

C: "Categoria"
D: "Productos"

- C.hasMany(D): B necesita foreign key
- C.belongsTo(B)

![Asociaciones](https://static.platzi.com/media/user_upload/Screen%20Shot%202021-10-25%20at%2013.25.34-0aa425c8-d2c0-4cba-ae01-f214e9604c14.jpg)

## 📘 Licencia

La licencia no es libre, este sistema es desarrollado para la empresa gama store
