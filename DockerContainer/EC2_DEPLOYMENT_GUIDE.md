# G7VisionAI EC2 Deployment Guide

## Overview
This guide will help you deploy the G7VisionAI website to Amazon EC2 using Docker.

## Prerequisites
- AWS Account with EC2 access
- EC2 instance running (Amazon Linux 2 or Ubuntu)
- SSH access to your EC2 instance
- Docker image: `jolenele11/g7visionai-website:latest` (already pushed to DockerHub)

## Step 1: Launch EC2 Instance

### 1.1 Create EC2 Instance
1. Go to AWS Console → EC2 → Launch Instance
2. Choose Amazon Linux 2 AMI (or Ubuntu)
3. Select instance type (t2.micro for testing, t3.small for production)
4. Configure security group:
   - **Inbound Rules:**
     - SSH (22) from your IP
     - HTTP (80) from anywhere (0.0.0.0/0)
     - HTTPS (443) from anywhere (0.0.0.0/0) - optional
5. Launch instance and download key pair

### 1.2 Connect to EC2 Instance
```bash
# Replace YOUR_EC2_PUBLIC_IP with your actual EC2 public IP
ssh -i ec2keypair.pem ec2-user@YOUR_EC2_PUBLIC_IP
```

## Step 2: Install Docker on EC2

### For Amazon Linux 2:
```bash
# Update system
sudo yum update -y

# Install Docker
sudo yum install -y docker

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add ec2-user to docker group
sudo usermod -a -G docker ec2-user

# Log out and log back in for group changes to take effect
exit
```

### For Ubuntu:
```bash
# Update system
sudo apt update -y

# Install Docker
sudo apt install -y docker.io

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add ubuntu user to docker group
sudo usermod -a -G docker ubuntu

# Log out and log back in for group changes to take effect
exit
```

## Step 3: Deploy G7VisionAI Website

### 3.1 Reconnect to EC2 (after Docker installation)
```bash
ssh -i ec2keypair.pem ec2-user@YOUR_EC2_PUBLIC_IP
```

### 3.2 Pull and Run Docker Container
```bash
# Pull the Docker image (specify platform for EC2 compatibility)
docker pull --platform linux/amd64 jolenele11/g7visionai-website:latest

# Run the container
docker run -d \
  --name g7visionai-website \
  -p 80:80 \
  --restart unless-stopped \
  jolenele11/g7visionai-website:latest
```

### 3.3 Verify Deployment
```bash
# Check if container is running
docker ps

# Check container logs
docker logs g7visionai-website

# Test the website
curl http://localhost/health
```

## Step 4: Access Your Website

1. Open your web browser
2. Navigate to: `http://YOUR_EC2_PUBLIC_IP`
3. You should see the G7VisionAI website

## Step 5: Optional - Use Docker Compose

### 5.1 Create docker-compose.yml on EC2
```bash
# Create directory
mkdir -p /home/ec2-user/g7visionai
cd /home/ec2-user/g7visionai

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  g7visionai-web:
    image: jolenele11/g7visionai-website:latest
    container_name: g7visionai-website
    ports:
      - "80:80"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
EOF
```

### 5.2 Deploy with Docker Compose
```bash
# Stop existing container
docker stop g7visionai-website
docker rm g7visionai-website

# Deploy with docker-compose
docker-compose up -d
```

## Step 6: Monitoring and Maintenance

### 6.1 Useful Docker Commands
```bash
# View running containers
docker ps

# View container logs
docker logs g7visionai-website

# View container stats
docker stats g7visionai-website

# Restart container
docker restart g7visionai-website

# Stop container
docker stop g7visionai-website

# Remove container
docker rm g7visionai-website

# Update to latest image
docker pull jolenele11/g7visionai-website:latest
docker stop g7visionai-website
docker rm g7visionai-website
docker run -d --name g7visionai-website -p 80:80 --restart unless-stopped jolenele11/g7visionai-website:latest
```

### 6.2 Set up Log Rotation (Optional)
```bash
# Create log rotation configuration
sudo tee /etc/logrotate.d/docker-containers << 'EOF'
/var/lib/docker/containers/*/*.log {
    rotate 7
    daily
    compress
    size=1M
    missingok
    delaycompress
    copytruncate
}
EOF
```

## Step 7: Security Considerations

### 7.1 Firewall Configuration
```bash
# For Amazon Linux 2
sudo yum install -y firewalld
sudo systemctl start firewalld
sudo systemctl enable firewalld

# Allow HTTP traffic
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --reload
```

### 7.2 SSL/HTTPS Setup (Optional)
For production, consider setting up SSL using:
- AWS Certificate Manager (ACM)
- Application Load Balancer (ALB)
- CloudFront CDN

## Troubleshooting

### Common Issues:

1. **Architecture Mismatch Error:**
   ```
   no matching manifest for linux/amd64 in the manifest list entries
   ```
   **Solution:** The Docker image was built for a different architecture. Use one of these solutions:
   
   **Option A: Pull specific architecture**
   ```bash
   docker pull --platform linux/amd64 jolenele11/g7visionai-website:latest
   ```
   
   **Option B: Build multi-architecture image locally**
   ```bash
   # On your local machine (where you built the image)
   ./DockerContainer/build-and-push.sh
   ```

2. **Container won't start:**
   ```bash
   docker logs g7visionai-website
   ```

3. **Port 80 already in use:**
   ```bash
   sudo netstat -tlnp | grep :80
   sudo systemctl stop httpd  # If Apache is running
   ```

4. **Permission denied:**
   ```bash
   # Make sure you're in the docker group
   groups
   # If not, log out and log back in
   ```

5. **Website not accessible:**
   - Check security group rules
   - Verify container is running: `docker ps`
   - Check container logs: `docker logs g7visionai-website`

## Quick Deployment Script

Save this as `deploy.sh` on your EC2 instance:

```bash
#!/bin/bash
set -e

echo "Deploying G7VisionAI website..."

# Stop existing container
docker stop g7visionai-website 2>/dev/null || true
docker rm g7visionai-website 2>/dev/null || true

# Pull latest image (specify platform for compatibility)
docker pull --platform linux/amd64 jolenele11/g7visionai-website:latest

# Run new container
docker run -d \
  --name g7visionai-website \
  -p 80:80 \
  --restart unless-stopped \
  jolenele11/g7visionai-website:latest

echo "Deployment complete!"
echo "Website available at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
```

Make it executable and run:
```bash
chmod +x deploy.sh
./deploy.sh
```

## Support

If you encounter any issues:
1. Check the container logs: `docker logs g7visionai-website`
2. Verify the container is running: `docker ps`
3. Test the health endpoint: `curl http://localhost/health`
4. Check EC2 security group settings

Your G7VisionAI website is now successfully deployed on EC2! 🚀
