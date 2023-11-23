import express from "express"
import bodyParser from "body-parser"

import apiRoutes from "./routes"

const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use(express.static("public"))
app.use("/api", apiRoutes)

app.listen(PORT, () => console.log(`server run at http://localhost:${PORT}`))
