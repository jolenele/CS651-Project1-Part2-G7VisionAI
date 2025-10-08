## Docker Deployment Guide AWS EC2

### 1. Build and Push Docker Image

1. **Create a `Dockerfile`** in the repository.

2. **Open Docker Desktop** and ensure `docker` commands work in your terminal.

3. **Build the Docker image:**
   ```sh
   docker build -t g7visionai:latest .
   ```

4. **Log in to Docker Hub:**
   ```sh
   docker login
   ```

5. **Tag the image:**
   ```sh
   docker tag g7visionai:latest rohankumar09/project-1-g7visionai:latest
   ```

6. **Push the image to your Docker Hub repository:**
   ```sh
   docker push rohankumar09/project-1-g7visionai:latest
   ```

---

### 2. Deploy on EC2 Instance

1. **Update packages:**
   ```sh
   sudo yum update -y
   ```

2. **Install Docker:**
   ```sh
   sudo yum install -y docker
   ```

3. **Start and enable Docker:**
   ```sh
   sudo systemctl enable docker
   sudo systemctl start docker
   ```

4. **Pull the Docker image from Docker Hub:**
   ```sh
   sudo docker pull rohankumar09/project-1-g7visionai:latest
   ```

5. **Run the Docker container:**
   ```sh
   docker run -d --name project1-site -p 80:80 rohankumar09/project-1-g7visionai:latest
   ```

6. **Update the Security Group Settings:**  
   - Add a rule to allow all outbound traffic.

---

### 3. Access the Application

- Open your EC2 instance's public URL in a browser.

> **Note:** The application may not be accessible at the moment. Please verify security group settings and container logs if issues persist.