const express = require('express');
const _ = require('lodash');
const User = require('../Models/User');
const {
  authEmail,
  authSignUp,
  authToken,
  authLogin,
  generateToken,
  pickUserProps,
} = require('../Middleware/auth');
const router = express.Router();

router.get('/authToken', authToken, (req, res) => {
  User.findById(req.body.userId).then((data) => {
    res.json({ logged: true, body: pickUserProps(data) });
  });
});

router.post('/login', authLogin, (req, res) => {
  res.json({
    logged: true,
    body: pickUserProps(req.body.user),
    token: req.body.token,
  });
});

router.post('/signup', authEmail, authSignUp, (req, res) => {
  User.create(req.body).then((data) => {
    const token = generateToken(data._id, data.email);
    req.json({
      logged: true,
      body: pickUserProps(data),
      token,
    });
  });
});

module.exports = router;
