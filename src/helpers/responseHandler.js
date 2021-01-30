/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-classes-per-file
const HttpErrorCodes = {
  BAD_REQUEST: 400,
  INTERNAL_SERVER: 500,
};

export default class ApiError {
  constructor(code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

export class BadRequest extends ApiError {
  constructor(message, data) {
    super(HttpErrorCodes.BAD_REQUEST, message, data);
  }
}

export const apiErrorHandler = (err, req, res) => {
  if (err instanceof ApiError) {
    return res.status(err.code).json({
      message: err.message, status: 'error', data: err.data
    });
  }

  if (err instanceof SyntaxError && (err).status === 400 && 'body' in err
  ) {
    return res.status(HttpErrorCodes.BAD_REQUEST).json({
      message: 'Invalid JSON payload passed.',
      status: 'error',
      data: null,
    });
  }

  res.status(HttpErrorCodes.INTERNAL_SERVER).json({
    message: err.message, status: 'error', data: null
  });
};