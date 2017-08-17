import Joi from 'joi';

export default {
  updateChannel: {
    body: {
      _creator: Joi.string().required(),
      members: Joi.array().required(),
    }
  },

  createChannel: {
    members: Joi.array(),
  },
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
