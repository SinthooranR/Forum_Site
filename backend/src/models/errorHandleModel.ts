interface HttpError extends Error {
  msg?: string;
  code?: number;
}

class HttpError extends Error {
  constructor(msg: string, errCode: number) {
    super(msg); //adds message property in the error handle
    this.code = errCode; //adds an error code property
  }
}

export default HttpError;
