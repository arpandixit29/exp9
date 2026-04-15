# Quick Start Guide

## Project Overview

This project demonstrates a complete setup for a full-stack React + Node.js application with:
- Docker containerization for development and production
- GitHub Actions CI/CD pipeline
- Docker Compose for local orchestration
- Environment variable management

## File Structure Created

```
exp9/
├── client/                              # React Frontend
│   ├── Dockerfile                       # Production build (multi-stage)
│   ├── .dockerignore
│   ├── .env                            # Frontend env vars
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       └── index.css
│
├── server/                              # Node.js Express Backend
│   ├── Dockerfile                       # Simple Node.js image
│   ├── .dockerignore
│   ├── .env                            # Backend env vars
│   ├── package.json
│   └── server.js                       # Express server
│
├── .github/
│   └── workflows/
│       ├── ci.yml                      # GitHub Actions CI pipeline
│       └── cd.yml                      # GitHub Actions CD pipeline
│
├── docker-compose.yml                   # Local development with services
├── README.md                            # Main documentation
├── DOCKER_COMMANDS.md                  # Docker command reference
├── GITHUB_ACTIONS_SETUP.md             # CI/CD setup guide
├── ENVIRONMENT_VARIABLES.md            # Env vars documentation
└── .gitignore
```

## Getting Started

### 1. Local Development Setup (Docker Compose)

```bash
# Navigate to project
cd c:\Users\Arpan\Desktop\exp9

# Build and start all services (frontend, backend, MongoDB)
docker compose up --build

# Services will be available at:
# Frontend:  http://localhost:3000
# Backend:   http://localhost:5000
# MongoDB:   localhost:27017
```

### 2. Build Individual Docker Images

#### Frontend
```bash
# Production build (multi-stage with Nginx)
cd client
docker build -t my-react-app .
docker run -p 3000:80 my-react-app

# Open: http://localhost:3000
```

#### Backend
```bash
# Node.js development/production
cd server
docker build -t my-node-app .
docker run --env-file .env -p 5000:5000 my-node-app

# Test API: curl http://localhost:5000
```

### 3. Testing Locally (Without Docker)

#### Frontend
```bash
cd client
npm install
npm start      # Development server
npm test       # Run tests
npm run build  # Production build
```

#### Backend
```bash
cd server
npm install
npm start      # Runs with nodemon in dev
npm test       # Run tests
```

### 4. Push to GitHub & Setup CI/CD

#### Initialize Git Repository
```bash
cd c:\Users\Arpan\Desktop\exp9

git init
git add .
git commit -m "Initial commit: Docker & CI/CD setup"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

#### Configure GitHub Secrets
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Add secrets:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token

#### Trigger CI/CD
- Push to any branch → CI pipeline runs (tests build)
- Merge to main → CD pipeline runs (builds & pushes Docker images)

### 5. Verify in Docker Hub

After CD pipeline completes:
```bash
docker login                            # Login with credentials
docker pull username/frontend-app
docker pull username/backend-app
```

## Environment Variables

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
DB_URL=mongodb://mongo:27017/mydb
```

## Common Tasks

### Run in Production Mode
```bash
docker compose up --build
# Edit docker-compose.yml to set NODE_ENV=production
```

### View Logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
docker compose logs -f frontend
```

### Stop Services
```bash
docker compose down              # Stop containers
docker compose down -v           # Stop containers & remove volumes
```

### Clear Everything
```bash
docker system prune -a --volumes # Remove all unused resources
```

### Test API Locally
```bash
# Get data from backend
curl http://localhost:5000/api/data

# Check health
curl http://localhost:5000/api/health
```

## Troubleshooting

### Port Already in Use
```bash
# Windows: Find process on port 3000
netstat -ano | findstr :3000

# Kill process
taskkill /PID <process-id> /F
```

### Container Cannot Connect to Services
- Use service names in Docker Compose (not localhost)
- Example: `mongodb://mongo:27017/mydb`

### Docker Hub Login Fails
- Verify username and token are correct
- Generate new token from Docker Hub Account Settings
- Ensure token has read/write permissions

### Frontend Not Connecting to Backend
- Check `REACT_APP_API_URL` in frontend .env
- Rebuild frontend after changing env vars
- In Docker Compose, use `http://backend:5000` (not localhost)

## Key Concepts

### Multi-Stage Docker Build (Frontend)
- Stage 1: Builds React app with Node
- Stage 2: Serves with lightweight Nginx
- Result: Smaller production image

### Environment Variables
- **Build-time (ARG):** Only during image construction
- **Run-time (ENV):** Available in running container
- **Frontend:** Only `REACT_APP_*` vars are exposed

### Docker Networking
- In Docker Compose, services communicate by name
- `backend` service is accessible as `http://backend:5000`
- `mongo` service is accessible as `mongodb://mongo:27017/mydb`

### CI/CD Pipeline
- **CI (ci.yml):** Runs on push/PR - tests & builds code
- **CD (cd.yml):** Runs on main push - builds & pushes Docker images
- Uses GitHub Secrets for sensitive credentials

## Documentation Files

- **README.md** - Complete project documentation
- **DOCKER_COMMANDS.md** - Docker command reference
- **GITHUB_ACTIONS_SETUP.md** - CI/CD setup guide
- **ENVIRONMENT_VARIABLES.md** - Env vars complete guide

## Next Steps

1. ✅ Setup Docker locally and test with `docker compose up`
2. ✅ Initialize Git repository and push to GitHub
3. ✅ Add Docker Hub secrets to GitHub
4. ✅ Monitor CI/CD pipelines in GitHub Actions
5. ✅ Deploy Docker images from Docker Hub
6. ✅ Monitor logs with `docker compose logs`

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Docker Hub](https://hub.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Express.js](https://expressjs.com/)
- [React Documentation](https://react.dev/)

## Support Commands

### Check Docker Installation
```bash
docker --version
docker compose --version
docker ps
```

### Verify Project Setup
```bash
cd c:\Users\Arpan\Desktop\exp9
dir /s                          # List all files
docker compose config           # Validate docker-compose.yml
```

### Health Check
```bash
# Start services
docker compose up -d

# Check if running
docker compose ps

# Test frontend
curl http://localhost:3000

# Test backend
curl http://localhost:5000/api/health

# Stop services
docker compose down
```
