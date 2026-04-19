#!/bin/bash
cd /home/deploy/tofu-ray-commerce

# Backup .env.production
if [ -f .env.production ]; then
  cp .env.production .env.production.backup
fi

# Fetch and reset
git fetch origin main
git checkout main
git reset --hard origin/main

# Restore .env.production
if [ -f .env.production.backup ]; then
  cp .env.production.backup .env.production
fi

# Deploy
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build --remove-orphans

echo "Deployment completed"
