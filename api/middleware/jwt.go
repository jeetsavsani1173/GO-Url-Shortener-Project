package middleware

import (
    "github.com/gofiber/fiber/v2"
    "github.com/golang-jwt/jwt/v4"
    "time"
    "os"
)

func GenerateJWT(username string) (string, error) {
    token := jwt.New(jwt.SigningMethodHS256)
    claims := token.Claims.(jwt.MapClaims)
    claims["username"] = username
    claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

    return token.SignedString([]byte(os.Getenv("JWT_SECRET_KEY")))
}

func JWTAuth() fiber.Handler {
    return func(c *fiber.Ctx) error {
        tokenString := c.Get("Authorization")

        if tokenString == "" {
            return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
                "message": "Missing or invalid token",
            })
        }

        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            return []byte(os.Getenv("JWT_SECRET_KEY")), nil
        })

        if err != nil || !token.Valid {
            return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
                "message": "Invalid token",
            })
        }

        return c.Next()
    }
}
