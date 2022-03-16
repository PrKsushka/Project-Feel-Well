class CustomError {
  public name: string;
  protected status: number;
  protected message: string;

  constructor(name: string, status = 500, message = 'Problem with server') {
    this.name = name;
    this.status = status;
    this.message = message;
  }

  get statusVal() {
    return this.status;
  }

  get messageVal() {
    return this.message;
  }

  static forbiddenRequest(message: string) {
    return new CustomError('err', 403, message);
  }

  static unauthorizedRequest(message: string) {
    return new CustomError('err', 401, message);
  }
}

export default CustomError;
