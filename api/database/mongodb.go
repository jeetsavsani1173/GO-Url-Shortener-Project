package database

import (
    "context"
    "log"
    "time"

    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

func Connect(uri string) {
    // Context with a timeout to prevent hanging
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    // Using the new recommended approach with mongo.Connect
    clientOptions := options.Client().ApplyURI(uri)
    var err error
    Client, err = mongo.Connect(ctx, clientOptions)
    if err != nil {
        log.Fatal("Failed to create MongoDB client:", err)
    }

    // Ping the MongoDB server to verify the connection
    err = Client.Ping(ctx, nil)
    if err != nil {
        log.Fatal("Failed to connect to MongoDB:", err)
    }

    log.Println("Connected to MongoDB")
}

func Disconnect() {
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    if err := Client.Disconnect(ctx); err != nil {
        log.Fatal("Failed to disconnect MongoDB client:", err)
    }
    log.Println("Disconnected from MongoDB")
}
