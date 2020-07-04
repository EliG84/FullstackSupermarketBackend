const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
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

const authEmail = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((data) => {
    if (data) return res.json({ logged: false, body: 'User already exists' });
    next();
  });
};

const authSignUp = (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.json({ logged: false, body: error });
  next();
};

const authToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.json({ logged: false, body: 'Token not present' });
  jwt.verify(token, config.get('key'), (err, decoded) => {
    if (err) return res.json({ logged: false, body: 'Invalid Token' });
    req.body.userId = decoded.id;
    next();
  });
};

const authLogin = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((data) => {
    if (!data)
      return res.json({ logged: false, body: 'Invalid login details' });
    bcrypt.compare(req.body.password, data.password, (err, same) => {
      if (!same)
        return res.json({
          logged: false,
          body: 'Check your login details and try again',
        });
      const token = jwt.sign(
        { id: data._id, email: data.email },
        config.get('key')
      );
      req.body.user = data;
      req.body.token = token;
      next();
    });
  });
};

const generateToken = (id, email) => {
  const token = jwt.sign({ id, email }, config.get('key'));
  return token;
};

const pickUserProps = (user) => {
  return _.pick(user, ['email', '_id', 'cart', 'image', 'profile']);
};

exports.authEmail = authEmail;
exports.authSignUp = authSignUp;
exports.authToken = authToken;
exports.authLogin = authLogin;
exports.generateToken = generateToken;
exports.pickUserProps = pickUserProps;
