#!/bin/bash

echo -e "\n\e[15;48;5;2m\e[1m Instalando dependencias \e[0m"
cd backend
npm install --silent
npm audit fix --silent
cd ..
cd mande
npm install --silent
npm audit fix --silent

echo -e "\n\e[15;48;5;2m\e[1m Construyendo imagen \e[0m"

docker build -t database

echo -e "\n\e[15;48;5;2m\e[1m Creando y levantando contenedores \e[0m"
docker run --name database -p 5432:5432 --hostname=postgres -e POSTGRES_PASSWORD=pg123 -d database

