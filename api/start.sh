#! /bin/bash
docker build -t startupunicorns-api:local .
docker rm -f startupunicorns-api || true
docker run --rm --name startupunicorns-api -p 5000:5000 startupunicorns-api:local
