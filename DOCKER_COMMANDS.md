# Docker Command Reference

## Building Images

```bash
# Build with default Dockerfile in current directory
docker build -t my-app .

# Build with custom Dockerfile path
docker build -t my-app -f path/to/Dockerfile .

# Build with build arguments
docker build --build-arg APP_VERSION=2.0 -t my-app .

# Build and tag for Docker Hub
docker build -t username/my-app:latest .
docker build -t username/my-app:1.0 .
```

## Running Containers

```bash
# Start a container
docker run my-app

# Run with port mapping
docker run -p 3000:3000 my-app

# Run with multiple port mappings
docker run -p 3000:3000 -p 5000:5000 my-app

# Run with environment variables
docker run -e PORT=5000 -e NODE_ENV=production my-app

# Run with .env file
docker run --env-file .env -p 3000:3000 my-app

# Run in background (detached)
docker run -d -p 3000:3000 my-app

# Run with name
docker run --name my-container -p 3000:3000 my-app

# Run with volume mount
docker run -v /local/path:/container/path my-app

# Run with interactive terminal
docker run -it my-app bash
```

## Container Management

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a container
docker stop container-id

# Start a stopped container
docker start container-id

# Restart a container
docker restart container-id

# Remove a container
docker rm container-id

# View container logs
docker logs container-id

# Follow logs in real-time
docker logs -f container-id

# Execute command in running container
docker exec -it container-id bash
```

## Image Management

```bash
# List images
docker images

# Remove an image
docker rmi image-id

# Remove unused images
docker image prune

# Tag an image
docker tag image-id username/my-app:latest

# View image history
docker history my-app

# Inspect image
docker inspect my-app
```

## Docker Hub Operations

```bash
# Login to Docker Hub
docker login

# Push image to Docker Hub
docker push username/my-app:latest

# Pull image from Docker Hub
docker pull username/my-app:latest

# Logout from Docker Hub
docker logout
```

## Docker Compose Commands

```bash
# Start services
docker compose up

# Start services in background
docker compose up -d

# Build and start services
docker compose up --build

# View service logs
docker compose logs

# Follow service logs
docker compose logs -f backend

# Follow specific service logs
docker compose logs -f frontend

# Stop services
docker compose stop

# Stop and remove services
docker compose down

# Remove volumes
docker compose down -v

# Rebuild services
docker compose build

# Restart services
docker compose restart

# View running services
docker compose ps

# Execute command in service
docker compose exec backend npm test
```

## System Management

```bash
# View Docker disk usage
docker system df

# Remove unused resources
docker system prune

# Remove all unused resources (including volumes)
docker system prune -a --volumes

# View Docker info
docker info

# Check Docker version
docker --version
```

## Debugging

```bash
# Build with progress output
docker build -t my-app --progress=plain .

# Run with verbose logging
docker run --log-driver json-file --log-opt max-size=10m my-app

# Inspect running process
docker top container-id

# View resource usage
docker stats

# Inspect container configuration
docker inspect container-id
```

## Networking

```bash
# List Docker networks
docker network ls

# Create a network
docker network create my-network

# Connect container to network
docker network connect my-network container-id

# Inspect network
docker network inspect my-network

# Run container on specific network
docker run --network my-network -p 3000:3000 my-app
```
