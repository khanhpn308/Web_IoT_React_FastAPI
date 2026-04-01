# IoT Management Console (Vite + React)

## Local development

```sh
npm install
npm run dev
```

Open `http://localhost:3000`.

## Backend (FastAPI)

See `backend/README.md`.

## Database (MySQL, local via Docker)

1) Copy `.env.example` to `.env` and set:

```text
MYSQL_ROOT_PASSWORD=...
```

2) Start services:

```sh
docker compose up
```

DB will be exposed at `localhost:3306` (user: `root`, db: `iot`).

## Build & preview

```sh
npm run build
npm run preview
```

## Docker (production)

```sh
docker build -t iot-console .
docker run --rm -p 8080:80 iot-console
```

Open `http://localhost:8080`.

## Run both services (optional)

```sh
docker compose up
```
