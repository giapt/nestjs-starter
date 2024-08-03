#!/bin/bash

### for testing purpose only, do not use this in production
docker rm -f backend || true
docker run -d --restart always \
--env-file .env \
-v $(pwd)/logs:/code/logs \
-p 3030:3000 \
--name backend rt-be
docker image prune -f