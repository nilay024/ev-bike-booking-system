import express from 'express';
import validate from '../../middleware/validate.js';
import AuthController from './controller.js';
import AuthValidator from './validator.js';

const router = express.Router();

/**
 * @route POST /api/register
 * @desc Register a new user
 * @access Public
 */
router.post(
  "/register",
  validate(AuthValidator.register),
  AuthController.register
);

/**
 * @route POST /api/login
 * @desc Login an existing user
 * @access Public
 */
router.post(
  "/login",
  validate(AuthValidator.login),
  AuthController.login
);

export default router;
