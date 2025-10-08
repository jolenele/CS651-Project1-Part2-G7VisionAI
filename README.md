# Docker Deployment Guide AWS EC2

**Table of contents**

- [1. Build and Push Docker Image](#1-build-and-push-docker-image)
- [2. Deploy on EC2 Instance](#2-deploy-on-ec2-instance)
- [3. Access the Application](#3-access-the-application)

---

### 1. Build and Push Docker Image

1. **Create a `Dockerfile`** in the repository. Viewable [here](https://github.com/jolenele/CS651-Project1-Part2-G7VisionAI/blob/main/Dockerfile).

2. **Open Docker Desktop** and ensure `docker` commands work in your terminal.

> ### NOTE: Steps below are done in local machine.

3. **Build the Docker image:**
   ```sh
   docker build -t g7visionai:latest .
   ```

   ![Images 1](Images/1.png)<br><br>
   ![Images 2](Images/2.png)<br><br>

4. **Log in to Docker Hub:**
   ```sh
   docker login
   ```

   ![Images 3](Images/3.png)<br><br>

5. **Tag the image:**
   ```sh
   docker tag g7visionai:latest rohankumar09/project-1-g7visionai:latest
   ```

   ![Images 4](Images/4.png)<br><br>

6. **Push the image to your Docker Hub repository:**
   ```sh
   docker push rohankumar09/project-1-g7visionai:latest
   ```

   ![Images 5](Images/5.png)<br><br>

> Docker hub public repository.  
> Note: Repository was created on docker hub before pushing the image.
   ![Images 6](Images/6.png)<br><br>


---

### 2. Deploy on EC2 Instance
>    Making EC2 instance
   ![Images 7](Images/7.png)<br><br>

>    Adding name - everything else is default
   ![Images 8](Images/8.png)<br><br>

>    default t3.micro
   ![Images 9](Images/9.png)<br><br>

>    Using pre existing key pair  
>    you can create a new one as well.
   ![Images 10](Images/10.png)<br><br>

>    default network settings - for now
   ![Images 11](Images/11.png)<br><br>

>    launching
   ![Images 12](Images/12.png)<br><br>

>    launch successful
   ![Images 13](Images/13.png)<br><br>

>    you can view the instance in the EC2 dashboard
   ![Images 14](Images/14.png)<br><br>

>    upon clicking "connect" you will see ssh connection instructions
   ![Images 15](Images/15.png)<br><br>
   
> ### NOTE: Steps below are done in local machine We log in to EC2 instance using SSH.
>    `ls` to view key file
   ![Images 16](Images/16.png)<br><br>

>    using ssh command from AWS EC2 dashboard to connect to instance
>    ssh log in successful  
   ![Images 17](Images/17.png)<br><br>

1. **Update packages:**
   ```sh
   sudo yum update -y
   ```

>    updating packages
   ![Images 18](Images/18.png)<br><br>

2. **Install Docker:**
   ```sh
   sudo yum install -y docker
   ```

>    installing docker on the EC2 instance
   ![Images 19](Images/19.png)<br><br>

>    installation logs
   ![Images 20](Images/20.png)<br><br>

>    installation complete
   ![Images 21](Images/21.png)<br><br>

3. **Start and enable Docker:**
   ```sh
   sudo systemctl enable docker
   sudo systemctl start docker
   ```
>    starting / enabling docker service
   ![Images 22](Images/22.png)<br><br>
   ![Images 23](Images/23.png)<br><br>


4. **Pull the Docker image from Docker Hub:**
   ```sh
   sudo docker pull rohankumar09/project-1-g7visionai:latest
   ```
>    pulling docker image from my docker hub repository
   ![Images 24](Images/24.png)<br><br>

>    checking to ensure image is pulled
   ![Images 25](Images/25.png)<br><br>


5. **Run the Docker container:**
   ```sh
   docker run -d --name project1-site -p 80:80 rohankumar09/project-1-g7visionai:latest
   ```
>    running a docker container from the pulled image
   ![Images 26](Images/26.png)<br><br>

>    checking to ensure container is running
   ![Images 27](Images/27.png)<br><br>

>    we can see the instance's public ipv4 address and public dns here
   ![Images 28](Images/28.png)<br><br>

>    Go to this address in your browser-- but first continue on to updating security group settings  
   ![Images 29](Images/29.png)<br><br>

   >change security group setting
   ![Images 30](Images/30.png)<br><br>


6. **Update the Security Group Settings:**  
   - Add a rule to allow all outbound traffic.

   ![Images 31](Images/31.png)<br><br>
>    allow all outbound traffic

---

### 3. Access the Application

- Open your EC2 instance's public URL in a browser.
> Do not forget to remove the 's' from 'https' in the URL.
> it will default to https and give "unreachable address error".
   ![Images 32](Images/32.png)<br><br>
   ![Images 33](Images/33.png)<br><br>
   ![Images 34](Images/34.png)<br><br>
   ![Images 35](Images/35.png)<br><br>
   ![Images 36](Images/36.png)<br><br>
   ![Images 37](Images/37.png)<br><br>
   ![Images 38](Images/38.png)<br><br>
   ![Images 39](Images/39.png)<br><br>