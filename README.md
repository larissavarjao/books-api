# Books API

This is a plataform in Node that you can saw some books that it's out there in the world, search for one that you liked and add a book that you want to put out there.

## Structure

1.  **`/api`**: This directory contains all api structure;
    1.1. **`/db`**: This directory contains the connection with Postgres and export the query method so we could perform queries on the database;
    1.2. **`/repositories`**: This directory contains the business logics;
    1.3. **`/routes`**: This directory contains the routes of the api;
    1.4. **`/utils`**: This directory contains functions that are shared in more than onde file;
    1.5. **`/validators`**: This directory contains functions that validates conditions to create or update entities;
2.  **`/node_modules`**: This directory contains all the modules installed necessary to the api run;
3.  **`/spec`**: This directory contains all the modules installed necessary to the api run;
    3.1. **`/__tests__`**: This directory contains the tests that cover the code;
    3.2. **`/generators`**: This directory contains the generators to our tests cases;
    3.3. **`/requests`**: This directory contains the requests that will be make to test our api;
    3.4. **`/setup`**: This directory contains setup the database to run our tests;

## To run locally the project

### Creating database and tables

You need to have Posgres installed on your machine. If you don't have it you can download [here](https://www.postgresql.org/download/).
First you have to create the database that you will use, one for testing and one for development.

```sql
CREATE DATABASE "name-of-your-database"
    WITH
    OWNER = postgres;
```

Install on you database uuid extension.

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

Create books table.

```sql
CREATE TABLE books (
    id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    subtitle varchar(255) NOT NULL,
    author varchar(255) NOT NULL,
    audio_url varchar(255),
    read_url varchar(255),
    image_url varchar(255)
);
```

### Creating enviroment variables

Change the .env.example to .env and env.test and put you enviroment variables there.

### Commands to run the application

#### To install the depencies

```shell
npm install
```

#### To run locally

```shell
npm run dev
```

#### To run tests

```shell
npm run test
```
