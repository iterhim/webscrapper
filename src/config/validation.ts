import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // server
  NODE_ENV: Joi.string().valid('local', 'development', 'staging', 'production').required(),
  PORT: Joi.number().required(),

  API_KEY_HEADER: Joi.string().required(),
  API_KEY: Joi.string().required(),

  // Docs
  DOCS_USER: Joi.string().required(),
  DOCS_PASSWORD: Joi.string().required(),
});
