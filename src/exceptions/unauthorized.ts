import { HttpException } from "./root";

export class UnauthorizedException extends HttpException {
  constructor(message: string, erroCode: number, errors?: any) {
    super(message, erroCode, 401, errors);
  }
}
