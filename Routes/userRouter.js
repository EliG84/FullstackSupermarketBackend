const express = require('express');
const _ = require('lodash');
const path = require('path');
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

router.get('/single/:id', (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id).then((data) => {
    console.log(data.profile);
    res.status(200).json(data.profile);
  });
});

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
  const newProfile = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    street: req.body.street,
    country: req.body.country,
    dob: req.body.dob,
  };
  console.log(newProfile);
  User.updateOne({ _id: req.params.id }, { profile: { ...newProfile } })
    .then((data) => {
      res.status(200).json({ uploaded: true, body: data });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ ok: false, body: 'Server Issue - Try again Later' });
    });
});

router.post('/userAvatar/:id', (req, res) => {
  if (req.files) {
    let myFile = req.files.userAvatar;
    myFile.name = req.params.id
      .concat('.')
      .concat(myFile.name.split('.').pop());
    myFile.mv('public/img/' + myFile.name, () => {
      User.updateOne(
        { _id: req.params.id },
        { profile: { image: `http://localhost:3001/img/${myFile.name}` } }
      )
        .then((data) => {
          res.status(200).json({ uploaded: true, body: data });
        })
        .catch((err) => {
          res
            .status(400)
            .json({ ok: false, body: 'Server Issue - Try again Later' });
        });
    });
  }
});

module.exports = router;
