import { Router } from "express"

import queueRoutes from "./queue"
import authRoutes from "./auth"
import { errorHandler } from "../middlewares/error"
import { jwtHandler } from "../middlewares/jwt"

const router = Router()

router.use(jwtHandler)

router.use("/auth", authRoutes)
router.use("/queue", queueRoutes)

router.use("*", errorHandler)

export default router
