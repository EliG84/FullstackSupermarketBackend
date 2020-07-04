const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  FirstName: { type: String, default: '' },
  LastName: { type: String, default: '' },
  street: { type: String, default: '' },
  country: { type: String, default: '' },
  dob: { type: Date, default: '' },
  image: { type: String, default: 'https://picsum.photos/200' },
});

module.exports = ProfileSchema;
