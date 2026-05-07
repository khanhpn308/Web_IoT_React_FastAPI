# Nền Tảng IoT - Kiến Trúc Split Services

Repository đã được tách theo hướng microservices để hỗ trợ triển khai độc lập:

- `app_service`: React frontend + FastAPI backend.
- `database_service`: MySQL + script khởi tạo dữ liệu.

## 1) Cấu trúc thư mục chính

```text
/
app_service/
  backend/
  src/
  public/
  generated/
  nginx/
  ssl/
  .npmrc
  docker-compose.yml
  .env.example

database_service/
  sql/
  docker-compose.yml
  .env.example

docs/
README.md
deloy.md
```

Các artifact monolith đã được dọn dẹp:

- `generated/` -> chuyển vào `app_service/generated/`
- `.npmrc` -> chuyển vào `app_service/.npmrc`
- đã xóa tại root: `dist/`, `node_modules/`, `nginx.conf`, `.env.example`

## 2) Khởi chạy Database Service

```sh
cd database_service
cp .env.example .env
docker compose up -d
```

Mặc định MySQL public port `3306` (có thể đổi bằng `MYSQL_PORT` trong `.env`).

## 3) Khởi chạy App Service

```sh
cd app_service
cp .env.example .env
docker compose up -d --build
```

Stack này hiện gồm `frontend`, `backend` và broker MQTT `mosquitto`. Backend kết nối broker bằng hostname nội bộ `mosquitto` qua port `1883`.

### Biến môi trường quan trọng cho backend

- `DB_HOST`: hostname/IP của server DB (ví dụ: `127.0.0.1`, private IP, tên DNS).
- `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
- `CORS_ORIGINS`: domain frontend hợp lệ.

Backend đọc trực tiếp các biến trên tại `app_service/backend/app/core/config.py`.

## 4) Phát triển cục bộ (không dùng Docker)

### Backend

```sh
cd app_service/backend
py -V:3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```sh
cd app_service
npm install
npm run dev
```

Truy cập: `http://localhost:3000`

## 5) Tài khoản admin mặc định

Nếu chưa có user `AD00000`, backend sẽ tự seed:

- Username: `AD00000`
- Password: `khanhxx007`

Khuyến nghị đổi mật khẩu ngay sau lần đăng nhập đầu tiên.

## 6) Tài liệu liên quan

- Tổng hợp tài liệu: `docs/README.md`
- Hướng dẫn setup: `docs/setup/README.md`
- Quy định frontend: `docs/guidelines/frontend-guidelines.md`
- Chuẩn token frontend (font/màu): `docs/design/frontend-design-tokens.md`
