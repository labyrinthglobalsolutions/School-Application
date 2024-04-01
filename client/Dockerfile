# Use Node.js LTS version as base image for building
FROM node:16.15.1-alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --silent --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use Apache as base image for serving the static files
FROM httpd:alpine

# Copy the build output from the builder stage to serve
COPY --from=builder /app/build /usr/local/apache2/htdocs/

# Copy the .htaccess file from the Dockerfile directory to Apache document root
COPY .htaccess /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80

# Enable the rewrite module in Apache configuration
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Set the AllowOverride directive to All for .htaccess support
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf

# Set the working directory to Apache document root
WORKDIR /usr/local/apache2/htdocs

# Command to run Apache
CMD ["httpd-foreground"]
