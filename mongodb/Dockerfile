# Use the official MongoDB image as a base
FROM mongo:latest

# Set environment variables for MongoDB (optional, already set in docker-compose.yml)
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=example

# Expose the default MongoDB port
EXPOSE 27017

# Default command to run MongoDB
CMD ["mongod"]
