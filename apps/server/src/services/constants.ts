import dotenv from "dotenv"

dotenv.configDotenv({ path: "../../.env" })

export const PORT = process.env.PORT || 8080
export const NODE_ENV = process.env.NODE_ENV || "development"
export const JWT_SECRET = process.env.JWT_SECRET || "secret"
