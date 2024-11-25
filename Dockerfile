# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Copy the frontend files to the Nginx html directory
COPY . .

# Expose port 80
EXPOSE 80

# The default command to run Nginx
# dev comment
CMD ["nginx", "-g", "daemon off;"]