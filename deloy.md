# Cập nhật hệ thống
sudo dnf update -y

# Cài đặt Docker
sudo dnf install -y docker

# Khởi động và thiết lập Docker tự động chạy khi boot
sudo systemctl start docker
sudo systemctl enable docker

# Cấp quyền cho user hiện tại (ec2-user) để dùng docker không cần sudo
sudo usermod -aG docker ec2-user

# Cài đặt docker compose
## Tạo thư mục chứ Plugin
sudo mkdir -p /usr/libexec/docker/cli-plugins

## Tải Docker Compose từ GitHub
sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-$(uname -m) -o /usr/libexec/docker/cli-plugins/docker-compose

## Cấp quyền thực thi
sudo chmod +x /usr/libexec/docker/cli-plugins/docker-compose

## Kiểm tra version
docker compose version

# Cài đặt git
sudo dnf install git -y

#Clone code từ Github
git clone httpslink

#Truy cập mysql (root):
docker exec -it web_iot_react_fastapi-db-1 mysql -u root -pkhanh

---

## HTTPS (Nginx trong Docker — chưa bật sẵn)

- Stack mặc định (`docker-compose.prod.yml`) **chỉ HTTP port 80**, **chưa** có SSL trong container.
- Để bật **443**: cần file chứng chỉ + override compose (đã thêm sẵn trong repo).

### Bước 1: Tên miền trỏ về EC2

Tạo bản ghi **A** `your-domain.com` → Public IP của instance (Let's Encrypt không cấp chứng chỉ “chuẩn” cho bare IP như trường hợp phổ biến).

### Bước 2: Lấy chứng chỉ Let’s Encrypt trên server

Tạm **dừng** container Nginx cho đến khi port 80 rảnh (standalone cần chiếm 80):

```bash
docker compose -f docker-compose.prod.yml stop nginx
sudo dnf install -y certbot
sudo certbot certonly --standalone -d your-domain.com --email you@example.com --agree-tos -n
```

Sao chép chứng chỉ vào thư mục `ssl/` trong project (Compose mount thư mục này):

```bash
mkdir -p ssl
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ssl/
sudo chown "$USER:$USER" ssl/*.pem
```

### Bước 3: Sửa `nginx/prod.https.conf`

Thay mọi `YOUR_DOMAIN` bằng tên miền thật (ví dụ `iot.example.com`) — **cả hai** chỗ `server_name`.

### Bước 4: `.env`

Đặt `CORS_ORIGINS=https://your-domain.com` (đúng scheme + domain).

### Bước 5: Chạy với file override HTTPS

```bash
docker compose -f docker-compose.prod.yml -f docker-compose.prod.https.yml up -d --build
```

Truy cập: `https://your-domain.com`. Gia hạn cert: `sudo certbot renew` (thường gắn cron); sau renew có thể cần copy lại file vào `ssl/` hoặc dùng symlink tới `/etc/letsencrypt/live/...` (mount trực tiếp thư mục live nếu bạn chỉnh volume trong compose).
