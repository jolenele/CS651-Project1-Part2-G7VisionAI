# Use the official Nginx image as base with multi-architecture support
FROM --platform=$BUILDPLATFORM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy all static files from the parent directory
COPY ../index.html .
COPY ../about.html .
COPY ../contact.html .
COPY ../signin.html .
COPY ../styles.css .
COPY ../script.js .
COPY ../signin-app.js .

# Copy nginx configuration
COPY DockerContainer/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
