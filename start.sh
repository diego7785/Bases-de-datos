#!/bin/bash

echo -e "\n\e[15;48;5;2m\e[1m Iniciando servidor \e[0m"

cd backend
npm start

echo -e "\n\e[15;48;5;2m\e[1m Iniciando cliente \e[0m"

cd..
cd mande
npm start

echo -e "\n\e[15;48;5;2m\e[1m Iniciando base de datos \e[0m"

docker start database
