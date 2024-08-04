# Ticket Booking API using GraphQL

This repository contains the code for building a ticket booking API using GraphQL, Node.js, Apollo Server, TypeScript, TypeORM, and MySQL. 

## Technologies Used

- Node.js
- GraphQL
- Apollo Server
- TypeScript
- TypeORM
- MySQL

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) 
- [Docker](https://www.docker.com/get-started) (to run MySQL container)
- [MySQL Workbench](https://www.mysql.com/products/workbench/) (for database management)


### Running MySQL as a Docker Container

- docker pull mysql/mysql-server

- docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=password -d -p 3306:3306 mysql/mysql-server


### Dependencies

npm install @apollo/server graphql reflect-metadata type-graphql typeorm mysql2 class-validator

npm install --save-dev typescript ts-node @types/node @types/express nodemon

