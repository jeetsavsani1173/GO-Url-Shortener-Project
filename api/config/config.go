package config

import (
    "log"
    "os"

    "github.com/joho/godotenv"
)

type Config struct {
    MongoURI     string
    JwtSecretKey string
}

func LoadConfig() Config {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    mongoURI := os.Getenv("MONGO_URI")
    jwtSecretKey := os.Getenv("JWT_SECRET_KEY")

    if mongoURI == "" || jwtSecretKey == "" {
        log.Fatal("Environment variables MONGO_URI and JWT_SECRET_KEY must be set")
    }

    return Config{
        MongoURI:     mongoURI,
        JwtSecretKey: jwtSecretKey,
    }
}
