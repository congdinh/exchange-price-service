#!/bin/bash
docker-compose -f docker-compose.yml build exchange-price-service exchange-price-stream
docker-compose -f docker-compose.yml up -d
