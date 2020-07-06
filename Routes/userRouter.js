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
  console.log(req.body.user);
  res.json({
    logged: true,
    body: pickUserProps(req.body.user),
    token: req.body.token,
  });
});

router.post('/signup', authEmail, authSignUp, (req, res) => {
  console.log(req.body);
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

router.put('/userProfile/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(400).json({ updated: false, body: 'User Not Found' });
  user.profile.FirstName = req.body.FirstName;
  user.profile.LastName = req.body.LastName;
  user.profile.street = req.body.street;
  user.profile.country = req.body.country;
  user.profile.dob = req.body.dob;
  await user.save();
  res.status(200).json({ updated: true, body: user.profile });
});

router.post('/userAvatar/:id', (req, res) => {
  if (req.files) {
    let myFile = req.files.userAvatar;
    myFile.name = req.params.id
      .concat('.')
      .concat(Math.random())
      .concat('.')
      .concat(myFile.name.split('.').pop());
    myFile.mv('public/img/' + myFile.name, async () => {
      const user = await User.findById(req.params.id);
      if (!user)
        return res
          .status(400)
          .json({ uploaded: false, body: 'Server Issue - Try again Later' });
      user.profile.image = `https://aqueous-brook-65256.herokuapp.com/img/${myFile.name}`;
      await user.save();
      res.status(200).json({
        uploaded: true,
        body: 'https://aqueous-brook-65256.herokuapp.com/img/' + myFile.name,
      });
    });
  } else {
    res.status(400).json({ upladed: false, body: 'Image not recieved' });
  }
});

module.exports = router;
