#!/bin/bash

echo -e "\n\e[15;48;5;2m\e[1m Instalando dependencias \e[0m"
cd backend
docker build -t back .

cd ..
cd mande
docker build  -t koronavairuz .

cd ..
docker build  -t base .

echo -e "\n\e[15;48;5;2m\e[1m Construyendo contenedores \e[0m"



echo -e "\n\e[15;48;5;2m\e[1m Levantando contenedores \e[0m"
docker-compose up

