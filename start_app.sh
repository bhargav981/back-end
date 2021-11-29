#!/bin/bash
export ssh_prv_key="$(cat ~/.ssh/id_rsa)"
docker-compose down
docker-compose up -d
docker exec -it agile_api bash
