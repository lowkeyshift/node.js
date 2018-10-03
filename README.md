# datadog-node-express
This repository demonstrates Datadog's monitoring prowess for a simple Node.JS application.  Here we create a simple Node.js application with the Datadog agent installed for APM monitoring.

## Prerequisites
1) You have a Datadog account.  If you do not have an account, sign up for a free 14-day trial here:
https://www.datadoghq.com/

2) You have Docker / Docker Compose installed for containerization.  Here are some links to get installed:
- **Docker**: https://www.docker.com/get-started
- **Docker Compose**: https://docs.docker.com/compose/install/


## How to Install / Run
- Replace <YOUR_DD_API_KEY> with your Datadog API key, which can be located here:


- Run `docker-compose up --build`
- The docker and docker-compose files open port 3000 on your host machine.  To start sending traffic using:
1) Open your browser to http://localhost/org/<any organization id>

2) Run the following command to hit loop through the first 1000 organizations:

    `curl http://localhost:3000/org/[1-1000]`

## New login/signin Pages

Additional dependency being used for automatic [MVC framework generation](https://www.npmjs.com/package/express-mvc-generator).

http://0.0.0.0:3000/login & http://0.0.0.0:3000/signup

## NEW DOCS

# Local Testing

1) Run the bash script `./local-test.sh` to create/delete and leverage the redis caching.
2) The `delete.py` will be called by the `local-test.sh` script.
3) If you are building this from scratch you will need to restart the demo-app run the `docker restart demo-app`
