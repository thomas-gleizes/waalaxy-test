import HttpException from "./HttpException"

export default class BadRequestException extends HttpException {
  constructor(message: string) {
    super(message, 400)
  }
}
