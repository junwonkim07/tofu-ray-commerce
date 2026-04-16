# Tofu-ray Commerce

WordPress + WooCommerce deployment stack for Vultr VPS with GitHub Actions CI/CD.

## Stack

- WordPress container
- MariaDB 10.6 container
- Nginx Proxy Manager for domain routing and SSL
- GitHub Actions SSH deploy workflow

## Project Structure

- docker-compose.yml: App and infra services
- .github/workflows/main.yml: Auto deploy on push to main
- .env.example: Server environment variable template
- context.md: Conversation and progress log

## Server Prerequisites

- Docker Engine + Docker Compose plugin installed on Vultr
- Repository cloned at ~/apps/tofu-ray-commerce
- .env created in project root on server (see .env.example)
- GitHub Secrets configured:
  - REMOTE_HOST
  - REMOTE_USER
  - SSH_PRIVATE_KEY

## Deploy Flow

1. Commit and push to main.
2. GitHub Actions runs .github/workflows/main.yml.
3. Workflow SSHes into server and runs:
	- cd ~/apps/tofu-ray-commerce
	- git pull origin main
	- docker compose up -d --build

## Local/Server Run

Run from project root:

```bash
docker compose up -d
docker compose ps
```

## Domain + SSL with Nginx Proxy Manager

1. Create DNS A record for your domain to point to server IP.
2. Open NPM admin at http://SERVER_IP:81.
3. Login with default account (change immediately):
	- Email: admin@example.com
	- Password: changeme
4. Add Proxy Host:
	- Domain Names: your domain
	- Forward Hostname/IP: wordpress
	- Forward Port: 80
5. In SSL tab:
	- Request a new SSL Certificate
	- Enable Force SSL
	- Agree to Let\'s Encrypt terms and save

## Notes

- The server .env is intentionally not in Git.
- If DB init fails, verify .env exists and variable names match docker-compose.yml.
