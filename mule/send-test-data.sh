#!/bin/bash

curl -X POST -H "Content-Type: application/json" --data-binary '{"valid":"false"}' http://localhost:8081/test