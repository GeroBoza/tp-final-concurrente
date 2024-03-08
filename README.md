
# Trabajo Final Programación Concurrente

Aplicación Backend E-Commerce


## Instalación

```bash
  cd /tp-final-concurrente
  npm install 
```
### Base de datos
En este caso tenemos 2 opciones:

- Dentro de la carpeta database se encuentra un archivo .sql, el cual puede ser importado desde phpmyadmin como de alguna otra aplicación que se utilice para manejar Bases de Datos relacionales.
- Otra opción sería crear una base de datos y luego correr las migraciones que se encuentran dentro de la carpeta /database/migrations de la siguiente forma:
```
npx sequelize-cli db:migrate
```
    
## Variables de Entorno

Las variables de entorno utilizadas para este proyecto son:

`NODE_ENV=development`

`DB_USER=root`

`DB_PASSWORD=root` o `DB_PASSWORD=""`

`DB_NAME=tp_final_concurrente`

`DB_HOST=localhost`


## Ejecución

Para correr la aplicación, una vez realizado todos los pasos anteriores se necesitarán 2 terminales.
- La primera para arrancar la aplicación en la cual debemos correr el comando: `npm start`
- Y en la segunda, que se utilizará para correr la simulacion debemos correr el comando: `npm run simulation`

