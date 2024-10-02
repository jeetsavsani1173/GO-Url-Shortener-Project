package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jeetsavsani1173/shorten-url-fiber-redis/database"
)

type Request struct {
	Username string `bson:"username"`
}

func getUserByUsername(c *fiber.Ctx) error {
	collection := database.Client.Database("mydatabase").Collection("users")
	
}
