# Moss Discgolf Klubb - Bag Tag System

A comprehensive bag tag tracking system for Moss Discgolf Klubb members. This system manages player rankings, achievements, and bag tag progression throughout the season.

## Features

- 🏆 Player ranking and leaderboard system
- 🎯 Bag tag tracking with achievement levels
- 📊 Tournament and round management
- 📈 Player statistics and performance tracking
- 🏅 Badge and milestone system
- 📱 Responsive web interface

## Tech Stack

- **Frontend**: React + Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js + Express, TypeScript
- **Database**: PostgreSQL
- **Deployment**: Docker

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Docker & Docker Compose (optional)

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Juungeldyret/moss-discgolf-bagtags.git
cd moss-discgolf-bagtags

# Setup with Docker
docker-compose up -d

# Or manual setup

# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend (in new terminal)
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Project Structure

```
.
├── backend/          # Node.js/Express API server
├── frontend/         # Next.js React application
├── database/         # Database schema and migrations
├── docs/             # Documentation
└── docker-compose.yml
```

## API Documentation

See [API.md](docs/API.md) for detailed endpoint documentation.

## Setup Guide

See [SETUP.md](docs/SETUP.md) for detailed setup instructions.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT
