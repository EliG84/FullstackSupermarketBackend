const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const config = require('config');
const User = require('../Models/User');

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().max(30).email().required(),
  password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  repeat_password: Joi.ref('password'),
  answer: Joi.string().max(50).required(),
});

export const authEmail = (req, res, next) => {
  User.findOne({ email: req.data.email }).then((data) => {
    if (data) return res.json({ logged: false, body: 'User already exists' });
    next();
  });
};

export const authSignUp = (req, res, next) => {
  const { error, value } = schema.validate(req.body).then(value);
  if (error)
    return res.json({ logged: false, body: error.ValidationError.message });
  next();
};

export const authToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.json({ logged: false, body: 'Token not present' });
  const decoded = jwt.verify(token, config.get('key'));
  if (!decoded) return res.json({ logged: false, body: 'Invalid Token' });
  req.body.userId = decoded.id;
  next();
};

export const authLogin = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((data) => {
    if (!data)
      return res.json({ logged: false, body: 'Invalid login details' });
    bcrypt.compare(req.body.password, data.password, (err, same) => {
      if (!same)
        res.json({
          logged: false,
          body: 'Check your login details and try again',
        });
      const token = jwt.sign(
        { id: data._id, email: data.email },
        config.get('key')
      );
      req.body.token = token;
      next();
    });
  });
};
