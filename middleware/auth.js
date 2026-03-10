import jwt from 'jsonwebtoken';
import { successResponse, errorResponse } from '../utils/response.js';

export default function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return errorResponse({
        res,
        message: 'Authentication token required',
        statusCode: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return errorResponse({
      res,
      message: 'Invalid or expired token',
      statusCode: 401,
    });
  }
}
