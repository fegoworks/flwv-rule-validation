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
    return res
      .status(err.code)
      .json({ message: err.message, status: 'error', data: err.data });
  }

  if (err instanceof SyntaxError && (err).status === 400 && 'body' in err
  ) {
    return res.status(HttpErrorCodes.BAD_REQUEST).json({
      message: 'Invalid JSON payload passed.',
      status: 'error',
      data: null,
    });
  }

  res
    .status(HttpErrorCodes.INTERNAL_SERVER)
    .json({ message: err.message, status: 'error', data: null });
};


export const successResponse = () => this.res.json({
  message: `field ${this.rule.field} successfully validated.`,
  status: 'success',
  data: {
    validation: {
      error: false,
      field: this.rule.field,
      field_value: this.getFieldValue(),
      condition: this.rule.condition,
      condition_value: this.rule.condition_value,
    },
  },
});

export const errorResponse = (fieldValidation = 'fieldValidation') => {
  if (fieldValidation) {
    throw new BadRequest(
      `field ${this.rule.field} is missing from data.`,
      null
    );
  }
  throw new BadRequest(`field ${this.rule.field} failed validation.`, {
    validation: {
      error: true,
      field: this.rule.field,
      field_value: this.getFieldValue(),
      condition: this.rule.condition,
      condition_value: this.rule.condition_value,
    },
  });
};