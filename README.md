# Shopland Application

Shopland is a full-stack application that enables users to explore products, manage orders, and leave reviews. The
application is built using modern technologies, including React for the frontend, Spring Boot for the backend, and
PostgreSQL as the database. This guide will show you how to set up and run the application locally using Docker.

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

Ensure Docker and Docker Compose are installed. Then, navigate to the project directory and run the following command to
build and start all services:

```bash
docker-compose up --build
```

### 3.Access the Application

Once the containers are up and running, you can access the application locally:

- **Frontend:** `http://localhost:5173/shopland`
- **Backend:** `http://localhost:8080/shopland`

## Libraries Used

### Backend:

- **Postgres** - JDBC driver for database for PostgresSQL.
- **liquibase-core** - a library for managing the database schema, changeset etc.
- **jjwt-api** - API for working with JWT.
- **jjwt-impl** - Implementation for working with JWT
- **jjwt-jackson** - Integration JWT with jackson library.
- **lombok** - Automate generating code such as setters and getters - reduce boilerplate.
- **jakarta.persistence-api** - Api for working with JPA.
- **Additionaly** - used https://dummyjson.com/products for migrating products to database.

### Frontend:

- **mui/icons-material** - Icons from Material Design.
- **mui/material** - Material-UI prepared components based.
- **types/react-router-dom** - Routing library.
- **axios** - Http library.

## Pages

- **Home Page:**
    - Page with products loaded from server.
    - Pressing at product tile redirect to product-details.
    - Search bar for filtering products by name.
- **Opinions Page:**
    - Only for logged users.
    - Listing an user opinions.
    - Enable user to edit or delete opinions.
- **Order History Page:**
    - Only for logged users.
    - Listing an user order history.
    - Pressing at order tile redirect to order-details.
- **Order Details Page:**
    - Only for logged users.
    - Displaying product included in order with total price.
- **Product Details Page:**
    - Displaying details of product.
    - For logged user - button add product to cart.
- **Payment Page:**
    - Displaying current users product in cart.
    - Button with accepting the cart (saving order and adding to history).

## Other Components

- **Header:**
    - Include navigating bar.
    - Login/Register button - depending if user is logged in.
    - Cart summary - for logged users.
- **Login Popup:**
    - Includes form for logging in.
- **Register Popup:**
    - Include form for registering.
- **Cart Dropdown:**
    - Displaying current user's cart with total price.
    - Button for redirecting to payment.
- **Add Opinion Popup:**
    - Form for adding opinion for product.

## Included Functionalities from project description

System and functionalities are based on roles:
Admin (A) - administrator of system, User (U) - user with account, Guest (G) - user without account.
All operations are performed on spring boot backend application.

- Home Page - A,U,G
- Displaying Products list - A,U,G
- Displaying Product Details - A,U,G
- Adding opinion for product - A, U
- JWT Authentication - Register and Login, Role protected routes on backend and frontend.
- Creating user - by register
- Adding product to cart - A,U
- Deleting product from cart - A,U
- Calculating summary price - A,U
- Displaying product in cart - A, U
- Accepting cart and placing in order history - A, U
- Displaying Orders history - A, U
- Displaying Order Details - A, U
- Keeping current logged user in local storage
- Redirecting for users without permission
- Backend server in NOT mocked version
- Add opinion form with validation (only 1 opinion for product by user) - A, U
- Editing opinion (only author can edit own opinion) - A, U
- Deleting opinion - A - admin can delete any opinion
- Component Library
- Dockerized application

## Postman Documentation

You can find detailed information on how to use Postman in the following documentation link:

[Postman Documentation](https://documenter.getpostman.com/view/37233656/2sAYQWLZZH)


## Authors:
- **Jerzy Boksa**
- **Mateusz Oracz**
