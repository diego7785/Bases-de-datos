# MANDE

[![postgreSQL version](https://img.shields.io/badge/PostgreSQL-v11.2-blue.svg?style=flat-square)](https://www.postgresql.org/) [![node version](https://img.shields.io/badge/Node-v12.15.0-green.svg?style=flat-square)](https://nodejs.org/en/) [![react version](https://img.shields.io/badge/Reactjs-v16.13.1-blue.svg?style=flat-square)](https://reactjs.org/) [![express version](https://img.shields.io/badge/Expressjs-v4.17.1-blue.svg?style=flat-square)](https://expressjs.com/) [![docker version](https://img.shields.io/badge/Docker-v19.03.6-blue.svg?style=flat-square)](https://www.docker.com/)


## Modulos

* [Axios](https://github.com/axios/axios)
* [Material-UI](https://material-ui.com/


## Para desarrolladores: 

### En caso de errores:

:warning: Error: ENOSPC: System limit for number of file watchers reached :warning:

Copiar y pegar en consola: 
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p


### Como instalar y correr por primera vez

* Clonar el repositorio

* Instalar requisitos previos de Docker

```
sudo apt update
sudo apt upgrade
sudo apt-get install  curl apt-transport-https ca-certificates software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
```

* Instalar Docker

```
sudo apt install docker-ce
```

* Verificar la instalacion

```
sudo docker run hello-world
```

* Una vez instalada es necesario instalar PgAdmin4 y Postgres con Postgis y crear una red para comunicarlos: 

```
docker network create --driver bridge pgnetwork
docker pull mdillon/postgis
docker pull dpage/pgadmin4
docker run --name postgis -p 5433:5432 --network=pgnetwork -e POSTGRES_PASSWORD=pg123 -d mdillon/postgis
docker run -p 80:80 --name pgadmin4 -e 'PGADMIN_DEFAULT_EMAIL=yo@domain.com' -e 'PGADMIN_DEFAULT_PASSWORD=pg123' --network=pgnetwork -d dpage/pgadmin4
```

* Acceder desde el navegador al puerto localhost:80, ingresar a PgAdmin con usuario yo@domain.com y contraseña pg123, crear un nuevo servidor, configurar asi:


![Alt text](/home/diego/Im%C3%A1genes/Captura%20de%20pantalla%20de%202020-05-24%2000-57-03.png?raw=true "DataBase")


El nombre del servidor queda a criterio del usuario, el username debe ser postgres y la contraseña pg123

:warning: En caso de error con el hostname este se obtiene de entrar a la consola y escribir ifconfig y tomar el inet address de la sección docker0 :warning:


![Alt text](/home/diego/Im%C3%A1genes/Captura%20de%20pantalla%20de%202020-05-24%2001-05-00.png?raw=true "HostnameError")


* Crear una base de datos con nombre Mande y copiarle el archivo Mande.sql

* Acceder a la carpeta backend y ejecutar:

```
npm i
```

Luego:

```
npm start
```

* Acceder a la carpeta de mande y ejecutar:

```
npm i
```

Luego

```
npm audit fix
```

Luego

```
npm start
```


* El backend corre en el puerto <http://localhost:5000>

* El frontend corre en el puerto <http://localhost:3000>

* La base de datos en <http://localhost:5433>


* Finalmente solo se accede desde el navegador a la direccion <http://localhost:3000>


### Como correr una siguiente vez

* Iniciar el contenedor de la base de datos:

```
docker start postgis
```

* Entrar a la carpeta backend y ejecutar:

```
npm start
```

* Entrar a la carpeta mande y ejecutar:

``` 
npm start
```

Listo, acceda desde el navegador a  <http://localhost:3000>




## Developers

Angélica María Muñoz Benávides - 1725435

Juan Pablo Dominguez Avenia - 1723226

Diego Andrés Bonilla Viáfara - 1722399 


### Information
Front basado en: Argon Dashboard React - v1.1.0 of Creative Tim

https://www.creative-tim.com
