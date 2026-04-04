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
docker exec -it web_iot_react_fastapi-db-1 mysql -u root -p
