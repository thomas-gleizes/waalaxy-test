import HttpException from "./HttpException"

export default class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, 404)
  }
}
