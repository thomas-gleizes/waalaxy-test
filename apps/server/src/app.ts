import express from "express"

const app = express()
const PORT = 3000

app.use(express.static("public"))

app.get("/api", (req, res) => {
  res.send({ hello: "world" })
})

app.listen(PORT, () => console.log(`server run at http://localhost:${PORT}`))
