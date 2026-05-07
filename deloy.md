# Hướng Dẫn Deploy Production (Split Services)

Tài liệu này được cập nhật theo mô hình tách dịch vụ:

- `database_service`: MySQL
- `app_service`: FastAPI + React/Nginx

## 1) Chuẩn bị server (Amazon Linux)

```bash
sudo dnf update -y
sudo dnf install -y docker git
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user
```

Cài Docker Compose plugin:

```bash
sudo mkdir -p /usr/libexec/docker/cli-plugins
sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-$(uname -m) -o /usr/libexec/docker/cli-plugins/docker-compose
sudo chmod +x /usr/libexec/docker/cli-plugins/docker-compose
docker compose version
```

## 2) Clone source code

```bash
git clone <your-repository-url>
cd React_FastAPI
```

## 3) Deploy `database_service`

```bash
cd database_service
cp .env.example .env
# chỉnh sửa mật khẩu và port nếu cần
docker compose up -d
```

Kiểm tra:

```bash
docker compose ps
docker compose logs -f db
```

## 4) Deploy `app_service`

```bash
cd ../app_service
cp .env.example .env
```

Sửa `.env`:

- `DB_HOST`: IP/hostname của DB server (có thể là máy khác).
- `DB_PORT`: port MySQL (thường 3306).
- `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
- `CORS_ORIGINS`: domain frontend hợp lệ.
- `FRONTEND_HTTP_PORT`: mặc định `80`.

Khởi chạy ứng dụng:

```bash
docker compose up -d --build
```

Kiểm tra:

```bash
docker compose ps
docker compose logs -f backend
docker compose logs -f frontend
```

## 5) Triển khai HTTPS với Certbot (khuyến nghị)

1. Tạo DNS A record trỏ domain về public IP server.
2. Lấy chứng chỉ:

```bash
sudo dnf install -y certbot
sudo certbot certonly --standalone -d your-domain.com --email you@example.com --agree-tos -n
```

3. Copy chứng chỉ vào `app_service/ssl/`:

```bash
cd app_service
mkdir -p ssl
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ssl/
sudo chown "$USER:$USER" ssl/*.pem
```

4. Sửa `app_service/nginx/prod.https.conf`, thay `YOUR_DOMAIN`.
5. Nếu cần dùng cấu hình HTTPS nâng cao, tạo file override compose theo chính sách vận hành nội bộ.

## 6) Vấn đề build frontend chậm trên EC2

Nếu instance RAM thấp (`t2.micro`, `t3.micro`), build JS có thể rất chậm do swap.

- Nâng cấp tạm thời lên `t3.small`/`t3.medium` khi build.
- Hoặc build image trên CI/CD rồi pull về server.
- Theo dõi tài nguyên: `free -h`, `docker stats`.

## 7) Restart container khi có cập nhật

**Viết tắt:**

- **RCU** = **Restart Containers on Update**.

**Công dụng:**

- Nạp code/cấu hình mới vào process đang chạy trong container.
- Tránh trường hợp đã `git pull` nhưng service vẫn chạy phiên bản cũ.

### 7.1 `app_service`

```bash
cd app_service
git fetch origin
git pull origin main
docker compose up -d --build frontend
docker compose restart backend

# Nếu có đổi .env hoặc docker-compose cho backend
docker compose up -d --force-recreate backend
```

### 7.2 `database_service`

```bash
cd ../database_service
git fetch origin
git pull origin main
docker compose up -d

# Khi đổi biến môi trường/cấu hình DB
docker compose up -d --force-recreate db
```

### 7.3 `influxdb_service`

```bash
cd ../influxdb_service
git fetch origin
git pull origin main
docker compose up -d

# Khi đổi biến môi trường/cấu hình InfluxDB
docker compose up -d --force-recreate influxdb
```

Lưu ý:

- Không chạy `docker compose down -v` nếu chưa backup dữ liệu volume.
