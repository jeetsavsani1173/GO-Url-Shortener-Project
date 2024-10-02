package handlers

import (
    "context"

    "github.com/gofiber/fiber/v2"
    "golang.org/x/crypto/bcrypt"
    "github.com/jeetsavsani1173/shorten-url-fiber-redis/database"
    "github.com/jeetsavsani1173/shorten-url-fiber-redis/models"
    "github.com/jeetsavsani1173/shorten-url-fiber-redis/middleware"
    "go.mongodb.org/mongo-driver/bson"
)

func Register(c *fiber.Ctx) error {
    collection := database.Client.Database("mydatabase").Collection("users")
    user := new(models.User)

    if err := c.BodyParser(user); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Invalid request"})
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Error hashing password"})
    }

    user.Password = string(hashedPassword)

    _, err = collection.InsertOne(context.TODO(), user)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Error creating user"})
    }

    return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "User created"})
}

func Login(c *fiber.Ctx) error {
    collection := database.Client.Database("mydatabase").Collection("users")
    user := new(models.User)

    if err := c.BodyParser(user); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Invalid request"})
    }

    var foundUser models.User
    err := collection.FindOne(context.TODO(), bson.M{"username": user.Username}).Decode(&foundUser)
    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Invalid credentials"})
    }

    err = bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(user.Password))
    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Invalid credentials"})
    }

    token, err := middleware.GenerateJWT(foundUser.Username)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Error generating token"})
    }

    return c.JSON(fiber.Map{"token": token})
}
