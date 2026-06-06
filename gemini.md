# Gemini context: Tập hợp ngữ cảnh liên kết tăng dần cho dự án

Mục đích: cung cấp ngữ cảnh mô tả toàn bộ dự án theo các tầng (cấp) để nạp cho mô hình theo cách liên kết tăng dần (progressive linking). Bắt đầu từ tóm tắt ngắn, rồi dẫn đến các tài liệu chính, sau đó đến mã nguồn và các điểm khởi đầu quan trọng.

---

## Cấp 0 — Tóm tắt ngắn (Snapshot)

Dự án là một ứng dụng IoT full-stack gồm frontend React (vite), backend FastAPI (Python), và các dịch vụ hạ tầng (database, influxdb, mosquitto). Mục tiêu: quản lý thiết bị IoT, lưu trữ và hiển thị dữ liệu thời gian thực, hỗ trợ xác thực/ phân quyền, và triển khai bằng Docker.

---

## Cấp 1 — Tài liệu chính (bắt đầu đọc ở đây)

- [docs/README.md](docs/README.md) — tóm tắt kho, hướng dẫn chung.
- [docs/overview.md](docs/overview.md) — mô tả tổng quan hệ thống và luồng dữ liệu.
- [docs/architecture/codebase-walkthrough.md](docs/architecture/codebase-walkthrough.md) — giải thích cấu trúc mã và các thư mục chính.
- [docs/api/openapi-like.yaml](docs/api/openapi-like.yaml) — API surface (tham khảo).

---

## Cấp 2 — Thành phần chính và giải thích ngắn

- Frontend:
  - [src/App.jsx](src/App.jsx) — entry của SPA.
  - [src/main.jsx](src/main.jsx) — mount React + cấu hình.
  - [app_service/src/components/Dashboard/GPS/](app_service/src/components/Dashboard/GPS/) — GPS Dashboard components.
  - [app_service/src/pages/GPSPage.jsx](app_service/src/pages/GPSPage.jsx) — Trang GPS tích hợp InfluxDB.
  - [app_service/package.json](app_service/package.json) — scripts, dep liên quan bản build/frontend deploy.
- Backend (FastAPI):
  - [app_service/backend/app/main.py](app_service/backend/app/main.py) — FastAPI app entrypoint.
  - [app_service/backend/requirements.txt](app_service/backend/requirements.txt) — dependency Python.
  - [app_service/backend/app/](app_service/backend/app/) — package backend: routes, core, models, schemas.
- Cơ sở dữ liệu & hạ tầng:
  - [database_service/sql/schema.sql](database_service/sql/schema.sql) — schema chính của DB.
  - [app_service/docker-compose.yml](app_service/docker-compose.yml) — docker compose cho app_service.
  - [influxdb_service/docker-compose.yml](influxdb_service/docker-compose.yml) — dịch vụ influx.
  - [ssl/](ssl/) và [nginx/](nginx/) — cấu hình https/proxy.

---

## Cấp 3 — Điểm vào và file quan trọng (đọc khi cần chi tiết)

Tệp này được tạo để làm nguồn ngữ cảnh cho mô hình Gemini; nếu muốn, tôi có thể mở rộng mỗi phần bằng tóm tắt chi tiết hơn (ví dụ trích đoạn từ từng file). Nếu đồng ý, tôi sẽ thêm trích đoạn ngắn từ các file backend và frontend quan trọng.

---

## Cấp 4 — Trích đoạn chi tiết (backend & hạ tầng)

1. `app_service/backend/app/main.py` — điểm vào FastAPI, vòng đời ứng dụng (startup/shutdown), khởi tạo MQTT subscriber và Influx client.

Ví dụ (startup):

- Chờ DB: `wait_for_db()`
- Tạo bảng: `Base.metadata.create_all(bind=engine)`
- Áp các migration nhẹ (hàm `ensure_*` trong `db_migrate`)
  - Khởi tạo `InfluxService`, `RealtimeHub`, `MqttSubscriber`
  - Ghi chú: InfluxDB trong hệ thống lưu các trường tọa độ `x`/`y` và `location` (lưu như tag `location`).

Hàm factory: `create_app()` trả về instance FastAPI với CORS và router gắn prefix `/api`.

7. `app_service/backend/app/api/locations_routes.py` — endpoint `GET /api/locations` quét thư mục SVG để đồng bộ danh sách bản đồ động cho GPS Dashboard.

8. `app_service/src/pages/GPSPage.jsx` — trang trung tâm gộp dữ liệu từ MySQL và InfluxDB (`/api/mqtt/history`) để hiển thị vị trí thiết bị realtime, cập nhật qua polling 15s.

2. `app_service/backend/requirements.txt` — thư viện chính:

- `fastapi`, `uvicorn`, `SQLAlchemy`, `pymysql`, `paho-mqtt`, `influxdb-client`, `pydantic`.

3. `database_service/sql/schema.sql` — schema MySQL mẫu, chứa các bảng `user`, `device`, `device_authorization`, `test_logs` và các chỉ mục/khoá ngoại liên quan.

4. `app_service/docker-compose.yml` — cấu hình dịch vụ:

- `mosquitto` (1883, 9001 websocket),
- `backend` (uvicorn, pip install từ `backend/requirements.txt`),
- `frontend` (build từ `Dockerfile`).

Biến môi trường quan trọng: `MQTT_*`, `INFLUX_*`, `CORS_ORIGINS`.

5. `app_service/mosquitto.conf` — listener TCP 1883 và websockets 9001, `allow_anonymous true` (dev).

6. `app_service/package.json` — frontend dùng Vite, React 19, nhiều thư viện UI/Tailwind; scripts: `dev`, `build`, `preview`.

---

Ghi chú: tôi đã không tìm thấy các file frontend `src/App.jsx` hoặc `src/components` trong workspace hiện tại — nếu bạn muốn, chỉ định đường dẫn chính xác hoặc cho phép tôi tìm thêm trong repo để thêm trích đoạn frontend tương tự.

## Hướng dẫn nạp ngữ cảnh liên kết tăng dần (ví dụ cú pháp)

1. Nạp Cấp 0 (tóm tắt ngắn) để có snapshot tổng quan.
2. Nếu cần chi tiết module, mở liên kết Cấp 1 tương ứng (ví dụ docs/architecture) và nạp phần đó.
3. Khi cần hiểu hành vi hoặc debug, theo liên kết Cấp 2 → Cấp 3 để đọc file mã nguồn cụ thể.

Ví dụ: "LOAD LEVEL=0" → "EXPAND docs/architecture/codebase-walkthrough.md" → "OPEN app_service/backend/app/main.py".

---

## Ghi chú nhanh

- Kho chứa nhiều hướng dẫn triển khai trong `docs/deployment` và troubleshooting trong `docs/troubleshooting`.
- Khi nạp ngữ cảnh cho mô hình, ưu tiên tóm tắt ngắn và tài liệu kiến trúc trước, rồi mới đi sâu vào mã nguồn để tránh quá tải token.

---
