# Shopland Application

Shopland is a full-stack application that enables users to explore products, manage orders, and leave reviews. The application is built using modern technologies, including React for the frontend, Spring Boot for the backend, and PostgreSQL as the database. This guide will show you how to set up and run the application locally using Docker.

---

## Tech Stack

### Frontend:
- **React** - A JavaScript library for building user interfaces.
- **React Router** - For handling frontend routing.
- **Nginx** - Used as a web server to serve the static React files.

### Backend:
- **Spring Boot** - A Java-based framework for building backend applications.
- **Maven** - Dependency management and build tool.
- **Java** - The backend is written in Java using the Spring Boot framework.

### Database:
- **PostgreSQL** - A relational database used for data storage.

### Other:
- **Docker** - Containerization platform used to build and run services in isolated environments.
- **Docker Compose** - Tool for defining and running multi-container Docker applications.

---

## Requirements

To run this application locally, you need to have the following installed:

- **Docker**: [Install Docker](https://www.docker.com/get-started)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

---

## Setup Instructions

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/JerzyCode/shopland
cd shopland
```

### 2. Build and Start the Application
Ensure Docker and Docker Compose are installed. Then, navigate to the project directory and run the following command to build and start all services:
```bash
docker-compose up --build
```

### 3.Access the Application
Once the containers are up and running, you can access the application locally:
- **Frontend:** `http://localhost:5173/shopland`
- **Backend:** `http://localhost:8080/shopland`