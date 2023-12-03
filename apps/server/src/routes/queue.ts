import { Router } from "express"

import * as QueueController from "../controllers/QueueController"
import { authHandler } from "../middlewares/auth"

const router = Router()

router.use(authHandler)

router.get("/events", QueueController.eventEmitter)
router.post("/", QueueController.addToQueue)
router.get("/", QueueController.displayQueue)

export default router
