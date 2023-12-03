import { Router } from "express"

import * as AuthController from "../controllers/AuthController"
import { authHandler } from "../middlewares/auth"

const router = Router()

router.post("/login", AuthController.login)
router.post("/register", AuthController.register)
router.post("/logout", [authHandler, AuthController.logout])

export default router
