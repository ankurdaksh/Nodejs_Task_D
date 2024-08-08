import Joi from 'joi';

 const userValidationSchema = Joi.object().keys({
    name: Joi.string().required().trim(),
    mobile: Joi.string().required().trim().pattern(/^\+?1?\d{9,15}$/),
    referralCode: Joi.string().trim(),
    gender: Joi.string().required().valid('Male', 'Female'),
    technology: Joi.array().items(Joi.string()),
    dateOfBirth: Joi.date().required(),
    images: Joi.array().items(Joi.object().keys({
      fileName: Joi.string().required(),
      fileType: Joi.string().required(),
      file: Joi.string().required(),
    })),
  });

  export const validateUser = (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  };