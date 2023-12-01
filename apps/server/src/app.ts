import express, { Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import apiRoutes from "./routes"
import HttpException from "./exceptions/http/HttpException"
import Exception from "./exceptions/Exception"

const app = express()
const PORT = 8080

app.use(bodyParser.json())
app.use(cors({ origin: "*" }))
app.use(express.static("public"))

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpException) return res.status(err.status).json({ message: err.message })

  console.error("Error", err)

  if (err instanceof Exception && process.env.NODE_ENV !== "production")
    return res.status(500).json({ message: err.message })

  res.status(500).json({ message: "Internal server error" })
})

app.use("/api", apiRoutes)

app.listen(PORT, () => console.log(`server run at http://localhost:${PORT}`))
