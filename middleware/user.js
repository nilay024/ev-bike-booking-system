import { errorResponse } from '../utils/response.js';

export default function user(req, res, next) {
  if (req.user.role !== 'user') {
    return errorResponse({
      res,
      message: 'Access denied. User role required.',
      statusCode: 403,
    });
  }

  next();
}
