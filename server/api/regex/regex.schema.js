import joi from 'joi';

export const update = {
  source: joi.string().required(),
  name: joi.string().required(),
  type: joi.number().required()
};

export const create = {
  ...update,
  password: joi.string()
};
