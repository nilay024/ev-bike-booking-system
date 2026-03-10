import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { errorResponse, successResponse } from '../../utils/response.js';
import User from './schema.js';

class AuthController {
  // Register User
  async register(req, res) {
    try {
      const { name, email, password, phone } = req.body;

      if (!name || !email || !password || !phone) {
        return errorResponse({
          res,
          message: 'All fields are required',
          statusCode: 400,
        });
      }

      const existingUser = await User.findOne({
        $or: [{ email }, { phone }],
      });

      if (existingUser) {
        return errorResponse({
          res,
          message:
            existingUser.email === email
              ? 'Email already registered'
              : 'Phone number already registered',
          statusCode: 400,
        });
      }

      const saltRounds = Number(process.env.BCRYPT_SALT) || 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
      });

      return successResponse({
        res,
        message: 'User registered successfully',
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
          },
        },
        statusCode: 201,
      });
    } catch (error) {
      console.error('Registration error:', error);

      return errorResponse({
        res,
        message: 'Internal server error',
        statusCode: 500,
      });
    }
  }

  // Login User
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return errorResponse({
          res,
          message: 'Email and password are required',
          statusCode: 400,
        });
      }

      const user = await User.findOne({ email }).select('+password name email phone role').lean();

      if (!user) {
        return errorResponse({
          res,
          message: 'Invalid email or password',
          statusCode: 401,
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return errorResponse({
          res,
          message: 'Invalid email or password',
          statusCode: 401,
        });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES || '1d' }
      );

      return successResponse({
        res,
        message: 'Login successful',
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
          },
        },
        statusCode: 200,
      });
    } catch (error) {
      console.error('Login error:', error);

      return errorResponse({
        res,
        message: 'Internal server error',
        statusCode: 500,
      });
    }
  }
}

export default new AuthController();
