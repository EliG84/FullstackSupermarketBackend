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
  User.updateOne({ _id: req.params.id }, { cart: cart })
    .then((data) => {
      res.status(200).json({ ok: true, body: 'Cart Updated' });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ ok: false, body: 'Server Issue - Try again Later' });
    });
});

router.put('/userProfile/:id', (req, res) => {
  const profile = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    street: req.body.street,
    dob: req.body.dob,
  };
  User.updateOne({ _id: req.params.id }, { profile: { ...profile } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ ok: false, body: 'Server Issue - Try again Later' });
    });
  const profile = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    street: req.body.street,
    dob: req.body.dob,
    image: `/img/${myFile.name}`,
  };
  User.updateOne({ _id: req.params.id }, { profile: { ...profile } })
    .then((data) => {
      res.status(200).json({ updated: true });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ ok: false, body: 'Server Issue - Try again Later' });
    });
});

router.put('/userAvatar/:id', (req, res) => {
  let myFile = req.files.userAvatar;
  myFile.name = req.params.id.concat('.').concat(myFile.split('.').pop());
  myFile.mv(path.resolve(__dirname, 'public/img', image.name), () => {
    const profile = {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      street: req.body.street,
      dob: req.body.dob,
      image: `/img/${myFile.name}`,
    };
    User.updateOne(
      { _id: req.params.id },
      { profile: { image: `/img/${myFile.name}` } }
    )
      .then((data) => {
        res.status(200).json({ uploaded: true });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ ok: false, body: 'Server Issue - Try again Later' });
      });
  });
});

module.exports = router;
