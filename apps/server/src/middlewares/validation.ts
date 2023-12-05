import { z } from "zod"
import { Request, Response, NextFunction } from "express"

import BadRequestException from "../exceptions/http/BadRequestException"

export const validateBody =
  (schema: z.ZodSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body)
      next()
    } catch (error) {
      next(new BadRequestException(error.message))
    }
  }

export const validateQuery =
  (schema: z.ZodSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = await schema.parseAsync(req.query)
      next()
    } catch (error) {
      next(new BadRequestException(error.message))
    }
  }

export const validateParams =
  (schema: z.ZodSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = await schema.parseAsync(req.params)
      next()
    } catch (error) {
      next(new BadRequestException(error.message))
    }
  }
