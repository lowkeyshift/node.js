#!/bin/bash
# Create an entry via the notes API
curl -X POST -H "Content-type: application/json" \
-d "{\"title\":\"Moes bar and grill\",
	\"content\":\"Best time of my life.\"}" \
'http://0.0.0.0:3000/notes'

# Redis query wiki.com
curl -I "http://0.0.0.0:3000/"
curl -I "http://0.0.0.0:3000/api/search?query=datadog"
sleep 2
curl -I "http://0.0.0.0:3000/api/newsearch"
curl -I "http://0.0.0.0:3000/"
curl -I "http://0.0.0.0:3000/api/search?query=datadog"
curl -I "http://0.0.0.0:3000/"

sleep 3
# Redis query wiki.com entry in redis cache
curl -I "http://0.0.0.0:3000/"
curl -I "http://0.0.0.0:3000/api/search?query=datadog"
curl -I "http://0.0.0.0:3000/"

# Create an entry via the notes API
sleep 1
curl -X POST -H "Content-type: application/json" \
-d "{\"title\":\"Moes bar and grill part2\",
	\"content\":\"Best time of my life all over again.\"}" \
'http://0.0.0.0:3000/notes'

sleep 1
python3 delete.py

