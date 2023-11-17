import express from "express"

console.log("Express()", express)

const app = express()
const PORT = 3000

app.get("/", (req, res) => {
  res.send({ hello: "world" })
})

app.listen(PORT, () => console.log(`server run at http://localhost:${PORT}`))
