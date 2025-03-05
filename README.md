# Notes Microservices

A lightweight, scalable Notes Management System built with NestJS microservices architecture.

## Overview

This project demonstrates a practical implementation of microservices for a simple note-taking application. It's designed as a learning resource for developers wanting to understand microservices concepts, communication patterns, and deployment strategies.

## Architecture

The system consists of three main microservices:

1. **API Gateway** (Port 3000)
   - Entry point for all client requests
   - Authentication middleware
   - Request routing to appropriate services

2. **User Service** (Port 3001)
   - User registration and authentication
   - JWT token management
   - User profile management

3. **Notes Service** (Port 3002)
   - CRUD operations for notes
   - Note categorization and searching
   - User-specific note management

## Technologies

- **Framework**: NestJS
- **Databases**: MongoDB
- **Communication**: TCP transport (microservices)
- **Authentication**: JWT (JSON Web Tokens)
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **API Documentation**: Swagger

## Getting Started

### Prerequisites

- Node.js (v14+)
- Docker and Docker Compose
- MongoDB (local or containerized)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gianlucamazzeo/notes-microservices.git
   cd notes-microservices
   ```

2. Install dependencies for all services:
   ```bash
   npm run install:all
   ```

3. Start the services using Docker Compose:
   ```bash
   docker-compose up
   ```

4. Access the API at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Notes
- `GET /notes` - Get all notes for authenticated user
- `GET /notes/:id` - Get a specific note
- `POST /notes` - Create a new note
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note

## Development

To run the services individually for development:

```bash
# API Gateway
cd api-gateway
npm run start:dev

# User Service
cd user-service
npm run start:dev

# Notes Service
cd notes-service
npm run start:dev
```

## Testing

Each service contains its own tests:

```bash
# Run tests for a specific service
cd [service-name]
npm run test

# Run e2e tests
npm run test:e2e
```

## Deployment

The project includes GitHub Actions workflows for CI/CD. Check `.github/workflows/` for details.

## Project Structure

```
notes-microservices/
├── api-gateway/          # API Gateway service
├── user-service/         # User management service
├── notes-service/        # Notes CRUD service
├── docker-compose.yml    # Docker Compose configuration
├── .github/workflows/    # GitHub Actions CI/CD
└── package.json          # Root package.json for scripts
```

## Learning Resources

This project demonstrates several microservices concepts:
- Service discovery and communication
- API Gateway pattern
- Authentication across microservices
- Data management in distributed systems
- Containerization and orchestration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
