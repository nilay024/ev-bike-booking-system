import { errorResponse } from '../utils/response.js';

export default function admin(req, res, next) {
  if (req.user.role !== 'admin') {
    return errorResponse({
      res,
      statusCode: 403,
    });
  }

  next();
}
