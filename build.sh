#!/bin/bash

docker build -t docker.pkg.github.com/khonkaen-hospital/print-label/print-label .
docker push docker.pkg.github.com/khonkaen-hospital/print-label/print-label
