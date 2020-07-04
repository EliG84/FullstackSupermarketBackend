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
    res.json({
      logged: true,
      body: pickUserProps(data),
      token,
    });
  });
});

router.put('/cartUpdate/:id', (req, res) => {
  const cart = req.body;
  console.log(cart);
  console.log(req.params.id);
  User.updateOne({ _id: req.params.id }, { cart: cart })
    .then((data) => {
      res.status(200).json({ body: 'Cart Updated' });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
