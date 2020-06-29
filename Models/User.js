const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Product = require('./Product');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  answer: { type: String, required: true },
  cart: [Product],
  profile: { type: Object, default: {} },
});

UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10, (err, secret) => {
    this.password = secret;
    bcrypt.hash(this.answare, 10, (err, secret) => {
      this.answare = secret;
      next();
    });
  });
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
