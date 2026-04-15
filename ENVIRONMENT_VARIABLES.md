# Environment Variables Complete Guide

## What Are Environment Variables?

Environment variables are key-value pairs that hold configuration data outside your source code. They are accessed at runtime by your application.

### Why Use Them?

✅ Keep secrets out of source code
✅ Easy configuration changes without rebuilding
✅ Different settings for development/production
✅ Sensitive data is not committed to Git
✅ Flexible deployment across environments

## Docker Environment Variables

### ENV Directive (Baked into Image)

```dockerfile
FROM node:20
ENV PORT=5000
ENV NODE_ENV=production
```

Access in application:
```javascript
const port = process.env.PORT;  // 5000
const env = process.env.NODE_ENV;  // production
```

**Use when:** Default values or rarely changing values

### -e Flag (Runtime)

```bash
docker run -e PORT=5000 -e NODE_ENV=production my-app
```

**Use when:** Override defaults or pass runtime values

### --env-file (Multiple Variables)

Create `.env` file:
```env
PORT=5000
NODE_ENV=production
DB_URL=mongodb://localhost:27017/mydb
API_KEY=secret123
```

Run with file:
```bash
docker run --env-file .env -p 5000:5000 my-app
```

**Use when:** Managing many variables

### Build Arguments (ARG)

```dockerfile
ARG APP_VERSION=1.0
RUN echo "Building version ${APP_VERSION}"
```

Build with argument:
```bash
docker build --build-arg APP_VERSION=2.0 -t my-app .
```

**Use when:** Values needed during build only

## Node.js Environment Variables

### Using .env with dotenv

Install:
```bash
npm install dotenv
```

Load in application:
```javascript
require('dotenv').config();

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;
const apiKey = process.env.API_KEY;
```

Create `.env`:
```env
PORT=5000
DB_URL=mongodb://localhost:27017/mydb
API_KEY=your-secret-key
```

### With TypeScript

```typescript
import dotenv from 'dotenv';

dotenv.config();

const port: string = process.env.PORT || '3000';
const env: string = process.env.NODE_ENV || 'development';
```

### Access Process Environment

Without additional packages:
```javascript
const port = process.env.PORT;
```

All variables are available in `process.env` object.

## React Environment Variables

### Create React App (CRA)

Only variables starting with `REACT_APP_` are exposed:

`.env`
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_APP_NAME=My App
REACT_APP_VERSION=1.0.0

# This won't be exposed to frontend
SECRET_KEY=not-exposed
```

Access in components:
```javascript
const apiUrl = process.env.REACT_APP_API_URL;
const appName = process.env.REACT_APP_APP_NAME;
```

### Important React Considerations

⚠️ **Frontend variables are public!**
- Not appropriate for secrets
- Visible in browser source
- Baked into build at compile time

✅ **Use frontend vars for:**
- API endpoint URLs
- Application names
- Feature flags
- Public configuration

❌ **Never put in frontend vars:**
- API keys
- Database credentials
- Private secrets
- Sensitive tokens

### Rebuilding for Different Environments

```bash
# Development build
REACT_APP_API_URL=http://localhost:5000 npm run build

# Production build
REACT_APP_API_URL=https://api.example.com npm run build
```

## Docker Compose Environment Variables

### service: environment (Inline)

```yaml
services:
  backend:
    build: ./server
    environment:
      - PORT=5000
      - NODE_ENV=production
      - DB_URL=mongodb://mongo:27017/mydb
```

### service: env_file (From File)

```yaml
services:
  backend:
    build: ./server
    env_file: server/.env
```

### Override at Runtime

```bash
docker compose up -e PORT=6000 backend
```

### Complete Example

```yaml
version: '3.9'

services:
  frontend:
    build: ./client
    ports:
      - "3000:80"
    environment:
      - REACT_APP_API_URL=http://backend:5000
    depends_on:
      - backend

  backend:
    build: ./server
    ports:
      - "5000:5000"
    env_file: server/.env
    environment:
      - PORT=5000
      - NODE_ENV=development
    depends_on:
      - mongo

  mongo:
    image: mongo:6-alpine
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

## Best Practices

### .env File

✅ **DO:**
- Use for defaults and non-sensitive config
- Commit `.env.example` with empty values
- Use different `.env` files per environment
- Document required variables

```env
# .env.example (commit to Git)
PORT=
DB_URL=
API_KEY=
```

❌ **DON'T:**
- Commit actual `.env` to Git
- Store production secrets
- Hardcode credentials
- Use in frontend code (unless React App)

### Docker

✅ **DO:**
- Use ENV for defaults
- Use -e or --env-file for runtime
- Use ARG for build-time only
- Document required variables

❌ **DON'T:**
- Hardcode secrets in Dockerfile
- Commit .env files with secrets
- Use localhost in containers (use service names)

### Naming Convention

```env
# Uppercase with underscores
PORT=5000
NODE_ENV=production
DB_URL=mongodb://localhost:27017/mydb
API_KEY=secret123
```

### Variable Validation

Node.js:
```javascript
require('dotenv').config();

function validateEnv() {
  const required = ['PORT', 'DB_URL', 'API_KEY'];
  
  for (const variable of required) {
    if (!process.env[variable]) {
      throw new Error(`Missing required environment variable: ${variable}`);
    }
  }
}

validateEnv();
```

## Common Environment Files

### Development
```env
NODE_ENV=development
PORT=5000
DB_URL=mongodb://localhost:27017/mydb
DEBUG=true
```

### Production
```env
NODE_ENV=production
PORT=80
DB_URL=mongodb://prod-server:27017/mydb
DEBUG=false
```

### Testing
```env
NODE_ENV=test
PORT=5001
DB_URL=mongodb://localhost:27017/test-db
DEBUG=true
```

## GitHub Actions Environment Variables

### Repository Secrets
```yaml
- name: Use Secret
  env:
    MY_SECRET: ${{ secrets.MY_SECRET }}
  run: echo "Secret available"
```

### GitHub-Provided Variables
```yaml
- name: Use GitHub Variable
  run: echo ${{ github.token }}
```

### Workflow Variables
```yaml
env:
  REGISTRY: docker.io

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Use Workflow Variable
        run: echo ${{ env.REGISTRY }}
```

### Matrix Strategy
```yaml
strategy:
  matrix:
    node: [18, 20, 22]

steps:
  - uses: actions/setup-node@v4
    with:
      node-version: ${{ matrix.node }}
```

## Debugging Environment Variables

### Node.js
```javascript
console.log('All variables:', process.env);
console.log('PORT:', process.env.PORT);
```

### Docker
```bash
docker run --env PORT=5000 my-app env  # List all env vars
```

### Docker Compose
```bash
docker compose exec backend env  # List service's env vars
```

## Security Checklist

- [ ] `.env` file is in `.gitignore`
- [ ] No hardcoded secrets in code
- [ ] Production secrets in GitHub Secrets
- [ ] Frontend only has public config
- [ ] Secrets are rotated regularly
- [ ] Different tokens per service/environment
- [ ] Access levels follow principle of least privilege
- [ ] Sensitive output is masked in logs
