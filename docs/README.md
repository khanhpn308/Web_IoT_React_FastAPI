# Bộ Tài Liệu Dự Án (Chuẩn Nội Bộ)

Tài liệu này chuẩn hóa theo 3 nhóm format:

- **IEEE SRS**: đặc tả yêu cầu phần mềm chi tiết.
- **OpenAPI-like**: mô tả hợp đồng API ở dạng YAML.
- **ADR (Architecture Decision Record)**: ghi nhận quyết định kiến trúc.

## Cấu trúc tài liệu

- `docs/srs/IEEE-SRS.md`: Đặc tả yêu cầu phần mềm (chuẩn IEEE).
- `docs/architecture/system-architecture.md`: Tài liệu kiến trúc hệ thống.
- `docs/design/ui-ux-design.md`: Tài liệu UI/UX.
- `docs/api/openapi-like.yaml`: Đặc tả API theo kiểu OpenAPI.
- `docs/api/api-documentation.md`: Diễn giải API cho dev/test.
- `docs/guidelines/frontend-guidelines.md`: Quy định kiến trúc và coding guideline Frontend.
- `docs/guidelines/backend-guidelines.md`: Quy định kiến trúc và coding guideline Backend.
- `docs/adr/ADR-0001-kien-truc-tong-the.md`: ADR kiến trúc tổng thể.
- `docs/adr/ADR-0002-chien-luoc-xac-thuc-phan-quyen.md`: ADR xác thực và phân quyền.
- `docs/adr/ADR-0003-chien-luoc-du-lieu-thiet-bi-realtime.md`: ADR dữ liệu realtime.

## Nguyên tắc cập nhật

- Mọi thay đổi endpoint phải cập nhật đồng thời:
  - `docs/api/openapi-like.yaml`
  - `docs/api/api-documentation.md`
- Mọi thay đổi quyết định kiến trúc bắt buộc tạo ADR mới trong `docs/adr`.
- Mọi thay đổi yêu cầu nghiệp vụ lớn phải phản ánh vào `docs/srs/IEEE-SRS.md`.
