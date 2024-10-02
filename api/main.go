package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/jeetsavsani1173/shorten-url-fiber-redis/config"
	"github.com/jeetsavsani1173/shorten-url-fiber-redis/database"
	"github.com/jeetsavsani1173/shorten-url-fiber-redis/handlers"
	"github.com/jeetsavsani1173/shorten-url-fiber-redis/middleware"
	"github.com/jeetsavsani1173/shorten-url-fiber-redis/routes"
	"github.com/joho/godotenv"
)

func setupRoutes(app *fiber.App) {
	app.Post("/register", handlers.Register)
	app.Post("/login", handlers.Login)
	app.Get("/:url", routes.ResolveURL)

	// Create a new router group for protected routes
	protected := app.Group("/api/v1")
	protected.Use(middleware.JWTAuth())
	protected.Post("/", routes.ShortenURL)
	protected.Get("/profile", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "This is a protected route"})
	})
}

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file", err)
	}

	cfg := config.LoadConfig()

	database.Connect(cfg.MongoURI)
	defer database.Disconnect()

	app := fiber.New()

	// Apply CORS middleware
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000", // React app URL
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders:     "Content-Type, Authorization",
		AllowCredentials: true,
	}))

	app.Use(logger.New())

	// mongoUsername := os.Getenv("MONGO_USERNAME")
	// mongoPassword := os.Getenv("MONGO_PASS")
	// // MongoDB connection URI
	// mongoURI := "mongodb://" + mongoUsername + ":" + mongoPassword + "@mongodb:27017"

	// // Set MongoDB client options
	// clientOptions := options.Client().ApplyURI(mongoURI)

	// client, err := mongo.Connect(context.TODO(), clientOptions)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	setupRoutes(app)

	log.Fatal(app.Listen(os.Getenv("APP_PORT")))
}
