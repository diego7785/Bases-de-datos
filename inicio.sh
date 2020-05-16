#!/bin/bash

echo -e "\n\e[15;48;5;2m\e[1m Instalando dependencias \e[0m"
cd backend
npm install
npm audit fix
cd ..
cd mande
npm install
npm audit fix
cd ..

echo -e "\n\e[15;48;5;2m\e[1m Construyendo contenedores \e[0m"
docker build -f Dockerfile-database -t database .
docker build -f Dockerfile-front -t front .
docker build -f Dockerfile-back -t back .

echo -e "\n\e[15;48;5;2m\e[1m Levantando contenedores \e[0m"
docker-compose up

