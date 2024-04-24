<h1 align="center">Boilerplate Express Prisma</h1>
<p align="center">Simple Boilerplate Express.js, Prisma ORM, Docker Compose, PostgreSQL Database</p>

<img src="assets/banner.png">

## Table of Contents

-   [Running on Localhost](#running-on-localhost)
-   [Data Models](#data-models)
-   [Prisma Cheatsheet](#prisma-cheatsheet)
-   [Bundling and Running the Docker Container](#bundling-and-running-the-docker-container)

## Running on Localhost

-   Clone this repository

```bash
git clone https://github.com/armandwipangestu/boilerplate-express-prisma && cd boilerplate-express-prisma
```

-   Running Docker Compose

> **Note**: This command will install the docker compose service such as `db` (PostgreSQL) and `adminer`
>
> Here are some information
> | Service | Port Mapping | Database | User | Password |
> | --------- | ------------- | -------- | ---------- | ---------- |
> | `db` | `5432`:`5432` | `testDB` | `postgres` | `postgres` |
> | `adminer` | `8080`:`8080` | - | - | - |

```bash
docker compose up
```

-   Install dependency

```bash
yarn
```

-   Copy `.env.example` to `.env` file

```bash
cp .env.example .env
```

-   Change `DATABASE_URL` value with your database own database configuration, for example

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
```

-   Migrate the database

```bash
npx prisma migrate dev
```

-   Seeding the tables

```bash
npx prisma db seed
```

-   Running the app

```bash
npm run dev
```

## Data Models

![Data Models](assets/data-models.png)

In this boilerplate, i'm just create a data model like above, here the detail about the relationship

| Table A    | Table B            | Relationship   | Description                                                                                                              |
| ---------- | ------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `user`     | `profile`          | `One-to-One`   | -                                                                                                                        |
| `user`     | `post`             | `One-to-Many`  | -                                                                                                                        |
| `post`     | `category`         | `Many-to-Many` | This explicit many-to-many relationship need intermediate model/tabel, so i'm use `_CategorysOnPost` as the intermediate |
| `post`     | `_CategorysOnPost` | `One-to-Many`  | -                                                                                                                        |
| `category` | `_CategorysOnPost` | `One-to-Many`  | -                                                                                                                        |

## Prisma Cheatsheet

-   Initialize

Run this command if you first setup with the prisma, prisma will generate the `.env` file and generate `prisma/schema.prisma` file for the data model

```bash
npx prisma init
```

-   Introspection

Run this command if you have already database and inside the database already defined the tables, so prisma introspection will create the data model based on the tables inside your database. So the database will be the single source of tools.

```bash
npx prisma db pull
```

-   Migration

Run this command if you don't have a database, but with this migration you must have a data model first by creating manually then you run the migration and your tables inside your database will be created based on data models in the `prisma/schema.prisma` file

> **Note**: Mostly if you run the migration first time, the migration name use `init`

```bash
npx prisma migrate dev --name <migration_name>
```

-   Prisma Studio

Run this command if you want to open a model via web

```bash
npx prisma studio
```

-   Seeding

> **Note**: Make sure you check the `package.json` file that have the custom command like this
>
> ```json
> "prisma": {
>    "seed": "node prisma/seed.js"
> },
> ```

```bash
npx prisma db seed
```

## Bundling and Running the Docker Container

-   Build the app into container

```bash
docker build -t boilerplate-express-prisma .
```

-   Running the container

```bash
docker run -it -p 5000:5000 boilerplate-express-prisma
```

-   Running with Compose

> **Note**: Add this `boilerplate-express-prisma` service into `docker-compose.yaml` file

```yaml
version: "3"
services:
    db: ...

    adminer: ...

    boilerplate-express-prisma:
        build:
            context: .
        environment:
            DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/testDB?schema=public"
            API_VERSION: "/api/v1"
        depends_on:
            - db
        ports:
            - "5000:5000"
```
