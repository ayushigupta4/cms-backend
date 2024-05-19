# Headless CMS Backend

This is the backend for a rudimentary headless CMS built with Node.js, Express, and Sequelize for a MySQL database.

## Features

- Dynamic entity creation with attributes.
- Automatic table definition based on entity attributes.
- Basic CRUD functionality for each entity.

## Prerequisites

- Node.js (v12 or higher)
- MySQL database
- Sequelize ORM

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ayushigupta4/cms-backend.git
   cd cms-backend

2. Install dependencies:
    npm install

3. Create a .env.local file in the root directory and configure your database settings:
    DB_HOST=localhost
    DB_USER=<your-database-username>
    DB_PASSWORD=<your-database-password>
    DB_NAME=<your-database-name>
    DB_DIALECT=mysql


## Running the Server
    Start the development server:
    npm start
    The server will run on http://localhost:5000.
