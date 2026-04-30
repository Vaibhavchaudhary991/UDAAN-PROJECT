# Docker & CI/CD Setup Guide

## Quick Start with Docker

### Prerequisites

- Docker Desktop installed ([Download](https://www.docker.com/products/docker-desktop))
- Docker Compose (included with Docker Desktop)

### Local Development with Docker Compose

1. **Create `.env` file** (copy from `.env.example`):

```bash
cp .env.example .env
```

2. **Start all services**:

```bash
docker-compose up -d
```

This will start:

- **MongoDB** (localhost:27017)
- **Backend API** (localhost:5000)
- **Frontend** (localhost:80 or localhost:3000)

3. **View logs**:

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

4. **Stop services**:

```bash
docker-compose down
```

5. **Full cleanup** (including volumes):

```bash
docker-compose down -v
```

---

## Building Docker Images Locally

### Build Backend Image

```bash
docker build -t udaan-backend:latest ./backend
```

### Build Frontend Image

```bash
docker build -t udaan-frontend:latest ./frontend
```

### Run Backend Container

```bash
docker run -d \
  -p 5000:5000 \
  -e MONGO_URI="mongodb://admin:password@host.docker.internal:27017/udaan?authSource=admin" \
  --name udaan-backend \
  udaan-backend:latest
```

### Run Frontend Container

```bash
docker run -d \
  -p 80:80 \
  -e VITE_API_URL="http://localhost:5000" \
  --name udaan-frontend \
  udaan-frontend:latest
```

---

## CI/CD Pipeline Details

### GitHub Actions Workflow Stages

#### 1. **Code Quality** ✅

- Installs dependencies
- Runs linting
- Checks code quality

#### 2. **Build Backend Docker** 🐳

- Multi-stage build for optimization
- Pushes to Docker Hub
- Caches layers for faster builds

#### 3. **Build Frontend Docker** 🐳

- Builds React app with Vite
- Uses Nginx for serving
- Includes security headers

#### 4. **Security Scanning** 🔒

- Trivy vulnerability scanner
- Checks dependencies for CVEs
- Reports SARIF to GitHub Security tab

#### 5. **Build Test** 🧪

- Tests npm builds
- Verifies syntax
- Uploads artifacts

#### 6. **Deploy** 🚀

- Only runs on main branch
- Deploys Docker images
- Add your hosting provider config here

---

## Setting Up GitHub Secrets

Add these secrets to GitHub repository settings:

1. **DOCKER_USERNAME**
   - Your Docker Hub username

2. **DOCKER_PASSWORD**
   - Docker Hub access token (not password)
   - [Create token](https://hub.docker.com/settings/security)

### Add Secrets Steps:

1. Go to `Settings` → `Secrets and variables` → `Actions`
2. Click `New repository secret`
3. Add each secret above

---

## Docker Image Structure

### Backend (Multi-stage Build)

- **Stage 1**: Node.js 18 Alpine - Installs dependencies
- **Stage 2**: Lightweight runtime - Only includes production code
- **Features**:
  - Non-root user for security
  - Health checks
  - Signal handling with dumb-init
  - ~200MB final image size

### Frontend (Nginx + React)

- **Stage 1**: Build with Node.js
- **Stage 2**: Serve with Nginx Alpine
- **Features**:
  - Static asset caching
  - SPA routing configuration
  - Security headers (CSP, XSS Protection, etc.)
  - Gzip compression
  - ~30MB final image size

---

## Environment Variables

Create `.env` file in root:

```env
# Backend
NODE_ENV=development
PORT=5000
MONGO_USERNAME=admin
MONGO_PASSWORD=password
JWT_SECRET=your-secret-key

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Frontend
VITE_API_URL=http://localhost:5000
FRONTEND_URL=http://localhost
```

---

## Deployment Options

### Option 1: Docker Hub + Self-hosted Server

```bash
# Pull images
docker pull yourusername/udaan-backend:latest
docker pull yourusername/udaan-frontend:latest

# Run with docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

### Option 2: Container Registry Alternatives

- **AWS ECR** - Amazon Elastic Container Registry
- **Google Cloud Registry** - GCR
- **Azure Container Registry** - ACR
- **GitLab Container Registry** - Built-in

### Option 3: Kubernetes

Update workflow to push to container registry and deploy to K8s cluster.

---

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port
lsof -ti:5000 | xargs kill -9  # Linux/Mac
netstat -ano | findstr :5000  # Windows
```

### Database Connection Issues

```bash
# Check MongoDB logs
docker-compose logs mongodb

# Verify connection string
mongodb://admin:password@mongodb:27017/udaan?authSource=admin
```

### Frontend Not Loading

```bash
# Check Nginx config
docker exec udaan-frontend nginx -t

# View Nginx logs
docker-compose logs frontend
```

### Clear Everything

```bash
docker system prune -a --volumes
```

---

## Security Best Practices

✅ **Implemented in this setup:**

- Non-root users in containers
- Health checks
- Security headers (CSP, X-Frame-Options, etc.)
- Multi-stage builds to reduce image size
- Secrets management with GitHub
- Vulnerability scanning with Trivy

⚠️ **Before Production:**

- Change `JWT_SECRET` in environment
- Use strong database credentials
- Enable HTTPS/TLS
- Implement proper CORS configuration
- Add rate limiting
- Set up monitoring and logging
- Use private Docker registry
- Implement network policies

---

## Docker Compose Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild images
docker-compose build

# Execute command in container
docker-compose exec backend npm install

# View resource usage
docker stats

# Remove unused images/volumes
docker system prune -a --volumes
```

---

## Next Steps

1. ✅ Configure GitHub secrets
2. ✅ Test locally with `docker-compose up`
3. ✅ Push to main branch to trigger CI/CD
4. ✅ Monitor GitHub Actions workflow
5. ✅ Deploy to production server
