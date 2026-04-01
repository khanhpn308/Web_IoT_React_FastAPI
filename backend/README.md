# Backend (FastAPI)

## Setup virtual environment (Windows PowerShell)

```powershell
cd backend
py -V:3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

## Run dev server

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Health check: `http://localhost:8000/api/health`
DB check: `http://localhost:8000/api/health/db`

## Environment variables

Copy `.env.example` to `.env` and adjust values.

## MySQL schema (table creation)

When deploying on server, paste your `CREATE TABLE ...` statements into `sql/schema.sql`
and mount it to the MySQL container init directory (see `docker-compose.yml` comment).

