#!/bin/bash

docker build -t docker.pkg.github.com/khonkaen-hospital/print-label/print-label:1.0.1 .
docker push docker.pkg.github.com/khonkaen-hospital/print-label/print-label:1.0.1
