import Joi from 'joi';

const createReferralSchema = Joi.object().keys({
    mobile: Joi.string().required().pattern(/^\+?1?\d{9,15}$/),
  });
  
  const getReferralUserListSchema = Joi.object().keys({
    page: Joi.number().integer().required(),
    limit: Joi.number().integer().required(),
  });
  
  const deleteReferralUserSchema = Joi.object().keys({
    id: Joi.string().required(),
  });
  
  export const validateCreateReferral = (req, res, next) => {
    const { error } = createReferralSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  };
  
  export const validateGetReferralUserList = (req, res, next) => {
    const { error } = getReferralUserListSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  };
  
  export const validateDeleteReferralUser = (req, res, next) => {
    const { error } = deleteReferralUserSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  };