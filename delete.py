import requests
import json

r = requests.get('http://localhost:3000/notes')
items = r.json()
collection_ids = []
for i in items:
    for k,v in i.items():
        if k == '_id':
            collection_ids.append(v)
    print("List created...")

for ids in collection_ids:
    url = 'http://localhost:3000/notes'+'/{}'.format(ids)
    r = requests.delete(url)
    print("Ids:{} deleted.".format(ids))
