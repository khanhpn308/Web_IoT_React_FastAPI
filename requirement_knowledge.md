# Danh sách kiến thức cần có để đọc hiểu và review dự án

## 1. Kiến thức cốt lõi bắt buộc (ưu tiên cao nhất)

1. HTTP/HTTPS fundamentals: method, status code, header, body, content-type, CORS, cookie vs bearer token.
2. REST API design: route naming, request/response schema, idempotency, error handling.
3. Python backend với FastAPI: router, dependency injection, middleware, startup/lifespan, validation.
4. SQL + ORM (SQLAlchemy): model mapping, session, transaction, query optimization, migration tư duy.
5. React frontend: component, state, context, hook, routing, protected route, role-based UI.
6. Docker và docker-compose: service orchestration, network nội bộ, volume, env var, startup order.

## 2. Lập trình mạng và networking (trọng tâm dự án IoT)

1. TCP/IP cơ bản: port, host, DNS, NAT, firewall.
2. HTTP API flow giữa frontend và backend qua reverse proxy (Nginx).
3. MQTT protocol cho IoT:
   1. publish/subscribe model
   2. topic design
   3. QoS, retain, keep-alive, client-id
   4. broker config (Mosquitto), reconnect behavior
4. Realtime data patterns:
   1. push vs pull
   2. websocket/event stream tư duy
   3. backpressure và reconnect
5. Multi-service networking trong Docker:
   1. service name resolution
   2. bridge network
   3. inter-container access

## 3. Bảo mật ứng dụng (rất quan trọng khi review)

1. Authentication và Authorization:
   1. JWT lifecycle (issue, expire, verify)
   2. role-based access control (admin/user)
   3. protected endpoint pattern
2. Password security:
   1. hashing với bcrypt
   2. reset/recover flow an toàn
   3. password policy
3. API security controls:
   1. input validation (Pydantic)
   2. SQL injection prevention (ORM)
   3. brute-force mitigation (rate limit, lockout)
   4. error message hygiene (không lộ thông tin nhạy cảm)
4. Transport security:
   1. TLS/HTTPS setup
   2. certificate basics
   3. secure reverse proxy config
5. Secrets management:
   1. env variables
   2. không hardcode secret
   3. khác biệt giữa dev và prod config

## 4. Dữ liệu và database

1. Relational schema design: user/device/authorization/test logs.
2. Constraint và integrity: unique key, foreign key, nullable rules.
3. Migration strategy:
   1. incremental SQL scripts
   2. backward compatibility
   3. production-safe rollout
4. Time-series thinking (vì có InfluxDB):
   1. timestamp precision
   2. measurement/tag/field model
   3. retention policy cơ bản
5. Data consistency giữa MySQL và InfluxDB.

## 5. Frontend kiến thức để review end-to-end

1. React Router + route guard.
2. Auth context và token storage strategy.
3. API client layer:
   1. base URL
   2. interceptor
   3. error normalization
4. Form validation, UX cho login/register/change password.
5. Dashboard/state sync với realtime hoặc polling data.

## 6. Kiến thức hệ thống và vận hành

1. Nginx reverse proxy:
   1. routing path
   2. static serving
   3. upstream to backend
2. Containerized deployment on Linux.
3. Logging/monitoring basics:
   1. app logs
   2. container logs
   3. broker logs
4. Startup sequence và health checks.
5. Troubleshooting production issues:
   1. DB connection fail
   2. MQTT disconnect
   3. CORS misconfig
   4. TLS cert errors

## 7. Kiến thức code quality và review kỹ thuật

1. Clean architecture basics: module boundaries, separation of concerns.
2. API contract consistency giữa backend schema và frontend types.
3. Error handling consistency (status code + message shape).
4. Naming, readability, dead code, duplicated logic.
5. Testability:
   1. unit test points
   2. integration test points
   3. API regression checklist

## 8. Testing cần biết

1. API testing: Postman/HTTP client, status + payload assertions.
2. Auth flow testing: login, token expiry, forbidden access.
3. Database integration test: create/update/query consistency.
4. MQTT integration test: publish/subscribe, reconnect edge cases.
5. End-to-end smoke test: login -> dashboard -> device operations.

## 9. Kiến thức domain IoT (nếu muốn review sâu)

1. Device telemetry lifecycle.
2. Device authorization/user-device mapping.
3. Topic naming convention cho thiết bị.
4. Reliability patterns cho kết nối chập chờn.

## 10. Công cụ nên thành thạo

1. Git/GitHub workflow.
2. Docker CLI + docker-compose.
3. SQL client cho MySQL.
4. API client (Postman/Insomnia/curl).
5. Log inspection tools.
