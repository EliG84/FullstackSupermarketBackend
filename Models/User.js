const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Product, ProductSchema } = require('./Product');
const ProfileSchema = require('../Models/profile');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  answer: { type: String, required: true },
  profile: { type: ProfileSchema, default: {} },
  cart: [ProductSchema],
  joined: { type: Date, default: Date.now() },
});

UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, (err, secret) => {
    this.password = secret;
    bcrypt.hash(this.answer, 10, (err, secret) => {
      this.answer = secret;
      next();
    });
  });
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
