#!/bin/bash
docker-compose -f docker-compose-local.yml build exchange-price-service
docker-compose -f docker-compose-local.yml up
