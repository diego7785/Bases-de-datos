FROM postgres:12
EXPOSE 5432
COPY ["Mande.sql", "./docker-entrypoint-initdb.d/"]
RUN apt-get update && apt-get install postgis postgresql-10-postgis-2.5-scripts -y
