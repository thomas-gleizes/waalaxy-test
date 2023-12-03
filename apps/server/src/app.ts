import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

import apiRoutes from "./routes"
import { PORT } from "./services/constants"

const app = express()

app.use(bodyParser.json())
app.use(cors({ origin: "*" }))
app.use(express.static("public"))

app.use("/api", apiRoutes)

app.listen(PORT, () => console.log(`server run at http://localhost:${PORT}`))
