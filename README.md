# Full-Stack React + Node.js Docker & CI/CD Setup

A complete example of Docker containerization and GitHub Actions CI/CD pipeline for a full-stack application with React frontend and Node.js Express backend.

## Project Structure

```
project-root/
├── client/                          # React frontend
│   ├── package.json
│   ├── Dockerfile                   # Production build
│   ├── .dockerignore
│   ├── .env                         # Environment variables
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       └── index.css
│
├── server/                          # Node.js Express backend
│   ├── package.json
│   ├── server.js
│   ├── Dockerfile
│   ├── .dockerignore
│   └── .env
│
├── .github/
│   └── workflows/
│       ├── ci.yml                   # Continuous Integration
│       └── cd.yml                   # Continuous Deployment
│
├── docker-compose.yml               # Local development setup
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- Git & GitHub Account
- Docker Hub Account (for pushing images)

### Local Development with Docker Compose

```bash
# Build and start all services
docker compose up --build

# Access the application
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Database: mongodb://localhost:27017
```

### Manual Docker Commands

#### Frontend (React)

```bash
# Development
docker build -t react-app ./client
docker run -p 3000:3000 react-app

# Production
docker build -t react-app-prod ./client
docker run -p 3000:80 react-app-prod
```

#### Backend (Node.js)

```bash
# Build
docker build -t node-app ./server

# Run with environment variables
docker run -p 5000:5000 \
  -e PORT=5000 \
  -e NODE_ENV=production \
  -e DB_URL=mongodb://localhost:27017/mydb \
  node-app

# Or use .env file
docker run --env-file server/.env -p 5000:5000 node-app
```

## Environment Variables

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000
```

**Note:** Only variables starting with `REACT_APP_` are exposed to the frontend and are baked into the production build.

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
DB_URL=mongodb://localhost:27017/mydb
API_KEY=your-secret-api-key
```

## GitHub Actions CI/CD

### CI Pipeline (ci.yml)

Triggered on pushes and pull requests to `main` or `develop`:

1. **Frontend CI**
   - Checksout code
   - Installs dependencies
   - Runs tests
   - Builds the application

2. **Backend CI**
   - Checkouts code
   - Installs dependencies
   - Runs tests

### CD Pipeline (cd.yml)

Triggered on push to `main` branch:

1. Logs into Docker Hub
2. Builds Docker images for frontend and backend
3. Pushes images to Docker Hub

### Setup CI/CD

1. **Create GitHub Secrets:**
   - Go to repository Settings → Secrets and variables → Actions
   - Add `DOCKERHUB_USERNAME`
   - Add `DOCKERHUB_TOKEN` (from Docker Hub Account Settings → Security)

2. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```

3. **Monitor the pipeline:**
   - Go to GitHub repository → Actions tab
   - View CI results on every commit
   - View CD results after merge to main

## Docker Concepts Covered

### Build-Time Variables (ARG)
- Used during image construction
- Not available in running container

### Run-Time Variables (ENV)
- Available inside the running container
- Can be overridden at runtime

### Multi-Stage Builds
- Frontend: Builds React app, serves with Nginx
- Backend: Simple Node.js app
- Reduces final image size

### .dockerignore
- Excludes unnecessary files from build context
- Speeds up builds

### Docker Networking
- Services communicate using service name in Docker Compose
- E.g., `mongodb://mongo:27017/mydb` (not localhost)

## Common Commands

```bash
# Build & Run
docker build -t my-app .
docker run -p 3000:3000 my-app

# Port Mapping
docker run -p 3000:3000 my-app

# Environment Variables
docker run -e PORT=5000 my-app
docker run --env-file .env my-app

# Docker Compose
docker compose up --build
docker compose down
docker compose logs -f backend

# Image Management
docker images
docker rmi image-id
docker rmi $(docker images -q)

# Container Management
docker ps
docker ps -a
docker stop container-id
docker rm container-id

# Push to Docker Hub
docker tag my-app username/my-app:latest
docker push username/my-app:latest
```

## Testing

### Frontend Tests
```bash
cd client
npm test
```

### Backend Tests
```bash
cd server
npm test
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
netstat -ano | findstr :3000
# Kill process (Windows)
taskkill /PID <process-id> /F
```

### Container Cannot Connect to Service
- Use service name (not localhost) in Docker Compose
- Example: `mongodb://mongo:27017/mydb`

### Environment Variables Not Applied
- Frontend: Rebuild the image
- Backend: Restart the container with correct env vars

### Docker Hub Login Issues
- Verify username and token
- Ensure token has read/write permissions
- Token should not have spaces

## References

- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Hub](https://hub.docker.com/)
- [Express.js](https://expressjs.com/)
- [React Documentation](https://react.dev/)

## License

MIT
