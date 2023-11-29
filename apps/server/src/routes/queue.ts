import express from "express"
import * as QueueController from "../controllers/QueueController"

const router = express.Router()

router.get("/events", QueueController.eventEmitter)

router.post("/", QueueController.addToQueue)
router.get("/", QueueController.displayQueueAndCredits)
router.get("/actions", QueueController.displayActions)

export default router
