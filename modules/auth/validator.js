import Joi from "joi";

class AuthValidator {

  register(data) {

    const schema = Joi.object({
      name: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be at most 50 characters long',
      }),

      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          'string.empty': 'Email is required',
          'string.email': 'Please provide a valid email address',
        }),

      phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
          'string.empty': 'Phone number is required',
          "string.pattern.base": "Phone number must be a valid 10 digit number"
        }),

      password: Joi.string()
        .min(6)
        .max(30)
        .required()
        .messages({
          'string.empty': 'Password is required',
          'string.min': 'Password must be at least 6 characters long',
          'string.max': 'Password must be at most 30 characters long',
        }),
    });

    return schema.validate(data);
  }

  login(data) {
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          'string.empty': 'Email is required',
          'string.email': 'Please provide a valid email address',
        }),

      password: Joi.string()
        .required()
        .messages({
          'string.empty': 'Password is required',
        }),
    });

    return schema.validate(data, { abortEarly: false });
  }

}

export default new AuthValidator();
