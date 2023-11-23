import express from "express"
import queueRoutes from "./queue"

const router = express.Router()

router.use("/queue", queueRoutes)

export default router
