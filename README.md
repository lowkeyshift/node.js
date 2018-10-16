# Local Testing

`Tested on Ubunut 16.04 & Mac OS X`
### Dependancies that you will need are [docker-engine](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04) and [docker-compose](https://docs.docker.com/compose/install/)
 
1) Build using the command `docker-compose up --build -d`
2) Run the bash script `./local-test.sh` to create/delete and leverage the redis caching to generate APM metrics.
3) The `delete.py` will be called by the `local-test.sh` script.
4) If you are building this from scratch you will need to restart the demo-app run the `docker restart demo-app`
