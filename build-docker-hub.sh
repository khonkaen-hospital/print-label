#!/bin/bash

docker buildx build  --platform linux/amd64  -t dixonsatit/print-label:1.0.2 .
docker push dixonsatit/print-label:1.0.2
