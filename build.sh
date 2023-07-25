#!/bin/bash

docker buildx build  --platform linux/amd64 -t ghcr.io/khonkaen-hospital/print-label/print-label:1.0.2 .
docker push ghcr.io/khonkaen-hospital/print-label/print-label:1.0.2
