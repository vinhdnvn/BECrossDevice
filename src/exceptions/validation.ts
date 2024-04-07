import { HttpException } from "./root";

export class UnprocessableEntity extends HttpException {
  constructor(error: any, message: string, errorsCode: any) {
    super(message, errorsCode, 422, error);
  }
}
