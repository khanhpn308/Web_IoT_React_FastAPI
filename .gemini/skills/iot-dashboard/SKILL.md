---
name: iot-dashboard
description: Ép buộc cấu trúc data contract giữa FastAPI và React Dashboard.
tools: ["read_file", "write_file", "list_directory"]
---

purpose: |
Skill này hướng dẫn Gemini cách sinh và đồng bộ Dashboard React chính xác với API
và hạ tầng hiện tại của dự án. Mục tiêu: khi Gemini được gọi để tạo/điều chỉnh UI,
nó phải tuân theo endpoint, schema, websocket contract, và biến môi trường đã có.

rules: | - Luôn ưu tiên schema và contract hiện tại trong `app_service/backend` và
`database_service/sql/schema.sql` hơn là suy diễn từ tên trường. - Khi cần thay đổi API, tạo PR cho `app_service/backend` thay vì chỉnh frontend trực tiếp. - Không thay đổi tên trường JSON trả về từ backend; nếu cần mapping, hãy tạo adapter nhỏ ở frontend.

api_reference:
base_prefix: /api
rest_endpoints: - path: /devices
methods: [GET, POST]
description: danh sách thiết bị, tạo thiết bị - path: /devices/{device_id}
methods: [GET, PUT, DELETE]
description: chi tiết/thay đổi/xoá thiết bị - path: /users
methods: [GET, POST]
description: quản lý user - path: /test-logs
methods: [GET]
description: logs thử nghiệm / uplink messages
websocket_endpoints: - path: /ws/global
description: kênh broadcast realtime cho frontend - path: /ws/devices/{device_id}
description: kênh realtime cho 1 device - path: /ws/esp32/{device_id}
description: kênh tương tác với ESP32

websocket_payload_schema:
realtime_message: - device_id: string - sensor_type: string - ts: number # epoch seconds - ts_iso: string - x: number | nullable - y: number | nullable - location: string | nullable - raw: object

auth_and_cors: | - API: most admin/user endpoints require `Authorization: Bearer <token>` (JWT). Public health endpoints do not. - WebSocket: pass `?access_token=<token>` in the WS URL or send `Authorization` header if supported by client. - CORS: frontend origin(s) are in `CORS_ORIGINS` env var; default `http://localhost:3000` during dev.

schemas:
device: - device_id: integer - devicename: string | nullable - status: enum('active','deactive') - user_device_asignment_id: integer - location: string | nullable - device_type: string | nullable - topic: string | nullable - publish_topic: string | nullable
user: - user_id: integer - username: string - fullname: string - email: string | nullable - phone: integer | nullable - role: enum('admin','user')
test_log: - id: bigint - protocol: string - node_id: string - gateway_id: string - topic: string | nullable - raw_hex: string | nullable - created_at: datetime

ui_mapping_guidelines: | - Device list view: GET `/api/devices` => table with `device_id, devicename, status, topic, publish_topic, location`. - Device detail view: GET `/api/devices/{id}` and websocket `/ws/devices/{id}` to show realtime telemetry. - Dashboard charts: ingest data from Influx via backend-provided endpoints (or proxy websocket events). - Test logs: GET `/api/test-logs` => paginated table, allow filtering by `gateway_id`, `node_id`, `created_at`.

examples:
sample_device_json: |
{
"device_id": 1,
"devicename": "sensor-01",
"status": "active",
"topic": "devices/sensor-01/telemetry",
"publish_topic": "devices/sensor-01/command"
}
sample_test_log_json: |
{
"id": 12345,
"protocol": "mqtt",
"node_id": "node-abc",
"gateway_id": "gw-1",
"topic": "devices/node-abc/telemetry",
"raw_hex": "deadbeef",
"created_at": "2026-05-17T12:34:56Z"
}

deliverables: - When asked to "generate dashboard", Gemini should output: - React component tree blueprint (files + props contract) matching the `schemas` above. - API client helpers using fetch/axios with correct endpoints and query params. - WebSocket client utilities subscribing to the correct `/ws` paths and emitting typed events. - Example unit tests (Jest/React Testing Library) validating UI renders with sample payloads.

notes: | - Frontend in this repo uses Vite + React 19; prefer functional components + hooks. - Charts: always use `recharts` (or another charting library declared in `app_service/package.json`).
Generated chart components must follow React 19 rendering patterns (functional components, hooks,
stable `key` usage, no deprecated lifecycle methods) and be compatible with the Recharts API. - Use Tailwind/CSS used in project; follow existing `app_service/package.json` deps. - If any endpoint or schema is missing, consult `app_service/backend/app/api` and `app_service/backend/app/models`.
