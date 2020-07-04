const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  FirstName: { type: String, default: 'Jon' },
  LastName: { type: String, default: 'Doe' },
  street: { type: String, default: '12 Main St.' },
  country: { type: String, default: 'Mars Colony 001' },
  dob: { type: Date, default: Date.now() },
  image: { type: String, default: 'https://picsum.photos/200' },
});

module.exports = ProfileSchema;
