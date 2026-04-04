# README Thiết Lập Môi Trường

- **Mã tài liệu**: SETUP-IOT-001
- **Phiên bản**: 1.0.0
- **Ngày cập nhật**: 2026-04-04

## 1. Yêu cầu hệ thống

- Node.js >= 20
- Python 3.12
- MySQL 8
- PowerShell (Windows) hoặc shell tương đương

## 2. Cấu hình biến môi trường

Tạo file `.env` ở root dự án với các nhóm biến:

- DB:
  - `DB_HOST`
  - `DB_PORT`
  - `DB_USER`
  - `DB_PASSWORD`
  - `DB_NAME`
- CORS:
  - `CORS_ORIGINS` (ví dụ `http://localhost:3000`)
- Frontend:
  - `VITE_API_URL` (ví dụ `http://localhost:8000`)
  - `VITE_WS_URL` (nếu dùng realtime)
- MQTT (tùy chọn):
  - `MQTT_HOST`, `MQTT_PORT`, `MQTT_TOPICS`, ...

## 3. Chạy backend

```powershell
cd backend
py -V:3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Kiểm tra:

- `http://localhost:8000/api/health`
- `http://localhost:8000/api/health/db`

## 4. Chạy frontend

```powershell
cd ..
npm install
npm run dev
```

Truy cập: `http://localhost:3000`

## 5. Tài khoản mặc định

Backend tự đảm bảo admin mặc định (nếu chưa tồn tại):

- Username: `AD00000`
- Password: `khanhxx007`

Khuyến nghị đổi mật khẩu ngay sau khi đăng nhập lần đầu.

## 6. Lưu ý vận hành

- Không commit file `.env`.
- Nếu DB schema cũ, backend có patch migration nhẹ lúc startup.
- MQTT không sẵn sàng không nên làm sập luồng API cốt lõi.
