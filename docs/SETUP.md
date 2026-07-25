# Setup Guide

## Prerequisites

- Node.js 18 or higher
- PostgreSQL 14 or higher
- Docker & Docker Compose (optional, for containerized setup)
- Git

## Quick Start with Docker

### 1. Clone the repository
```bash
git clone https://github.com/Juungeldyret/moss-discgolf-bagtags.git
cd moss-discgolf-bagtags
```

### 2. Start all services
```bash
docker-compose up -d
```

### 3. Access the application
- Frontend: http://localhost:3000
- API: http://localhost:3001
- Database: localhost:5432

### 4. Stop services
```bash
docker-compose down
```

## Manual Setup (Without Docker)

### 1. Clone the repository
```bash
git clone https://github.com/Juungeldyret/moss-discgolf-bagtags.git
cd moss-discgolf-bagtags
```

### 2. Setup PostgreSQL Database

```bash
# Create database
createin -U postgres moss_discgolf

# Import schema
psql -U postgres -d moss_discgolf -f database/schema.sql
```

### 3. Setup Backend

```bash
cd backend
npm install
cp .env.example .env

# Edit .env with your database credentials
# Then start the server
npm run dev
```

Server will be running at `http://localhost:3001`

### 4. Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Application will be available at `http://localhost:3000`

## Database Credentials (Development)

Default credentials for development:
- **User**: discgolf
- **Password**: discgolf_dev_password
- **Database**: moss_discgolf
- **Host**: localhost
- **Port**: 5432

⚠️ **Change these credentials for production!**

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://discgolf:discgolf_dev_password@localhost:5432/moss_discgolf
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Troubleshooting

### Database connection fails
- Ensure PostgreSQL is running
- Verify credentials in .env
- Check if port 5432 is not blocked

### Ports already in use
```bash
# Find process using port
lsof -i :3000  # Frontend
lsof -i :3001  # Backend
lsof -i :5432  # Database

# Kill process
kill -9 <PID>
```

### Docker issues
```bash
# Rebuild images
docker-compose build --no-cache

# Reset volumes
docker-compose down -v
docker-compose up -d
```

## Next Steps

1. Create first admin user
2. Add players to the system
3. Create tournaments
4. Record rounds and results
5. View leaderboards and statistics
