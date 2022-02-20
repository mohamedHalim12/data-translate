export default class AppError extends Error {
  code = 500;

  constructor(message = 'Internal server error', code = 500) {
    super(message);
    this.code = code;
  }

  toJSON() {
    const json = this.toObject();
    return JSON.stringify(json);
  }

  toString() {
    return this.message;
  }

  toObject() {
    return { message: this.message, code: this.code };
  }
}
