#!/bin/bash

docker build -t ghcr.io/khonkaen-hospital/print-label/print-label:1.0.1 .
docker push ghcr.io/khonkaen-hospital/print-label/print-label:1.0.1
