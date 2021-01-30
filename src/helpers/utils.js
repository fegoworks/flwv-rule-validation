export const handleSuccessResponse = (res, data, statusCode = 200) => res.status(statusCode).json({
  status: 'success',
  data,
});

export const handleErrorResponse = (res, error, statusCode = 400) => res.status(statusCode).json({
  status: 'Request Failed',
  error,
});
