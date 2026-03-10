/**
 * Standard success response
 */
export const successResponse = ({
  res,
  message = 'Request successful',
  data = null,
  statusCode = 200,
  meta = null,
}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data && { data }),
    ...(meta && { meta }),
  });
};

/**
 * Standard error response
 */
export const errorResponse = ({
  res,
  message = 'Something went wrong',
  statusCode = 500,
  errors = null,
}) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  });
};
