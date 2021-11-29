
export ssh_prv_key="$(cat ~/.ssh/id_rsa)"
docker-compose down
docker-compose build --no-cache
sh start_app.sh
