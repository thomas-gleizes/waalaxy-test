import express from "express"
import * as QueueController from "../controllers/QueueController"

const router = express.Router()

router.post("/", QueueController.addToQueue)
router.get("/", QueueController.displayQueueAndCredits)

export default router
