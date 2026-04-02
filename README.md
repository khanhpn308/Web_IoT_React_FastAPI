# IoT Management Console (Vite + React)

## Local development

```sh
npm install
npm run dev
```

Open `http://localhost:3000`.

## Backend (FastAPI)

See `backend/README.md`.

### Default admin (seeded on backend startup)

If no user with username `AD00000` exists yet, the API creates one:

- **Username:** `AD00000`
- **Password:** `khanhxx007`

Change this password after first login in production.

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

The frontend container proxies `/api` to **`http://backend:8000`** (set via `API_PROXY_TARGET` in `docker-compose.yml`). Do not point the proxy at `127.0.0.1:8000` inside Docker — that is the frontend container itself, not the API.
