import express from 'express';
import validate from '../../middleware/validate.js';
import AuthController from './controller.js';
import AuthValidator from './validator.js';

const router = express.Router();

router.post(
  "/register",
  validate(AuthValidator.register),
  AuthController.register
);

router.post(
  "/login",
  validate(AuthValidator.login),
  AuthController.login
);

export default router;
