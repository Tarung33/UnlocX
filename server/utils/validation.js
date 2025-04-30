const Joi = require('joi');

// User validation
exports.validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });

  return schema.validate(user);
};

// Goal validation
exports.validateGoal = (goal) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).max(500).required(),
    platform: Joi.string().required(),
    targetValue: Joi.number().min(1).required(),
    currentValue: Joi.number().min(0),
    reward: Joi.string().required(),
    deadline: Joi.date().greater('now').required(),
    user: Joi.string()
  });

  return schema.validate(goal);
};

// Platform validation
exports.validatePlatform = (platform) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).max(500).required(),
    logo: Joi.string().required(),
    apiEndpoint: Joi.string().uri().required(),
    apiAuthType: Joi.string().valid('oauth', 'apikey', 'none')
  });

  return schema.validate(platform);
};

// Reward validation
exports.validateReward = (reward) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).max(500).required(),
    image: Joi.string().required(),
    category: Joi.string().valid('subscription', 'discount', 'merchandise', 'food', 'other'),
    pointsRequired: Joi.number().min(1).required(),
    provider: Joi.string().required(),
    active: Joi.boolean()
  });

  return schema.validate(reward);
};

// Generic validation middleware
exports.validate = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) return res.status(400).json({ success: false, error: error.details[0].message });
    next();
  };
};