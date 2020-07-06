const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    FirstName: { type: String, default: 'Jon' },
    LastName: { type: String, default: 'Doe' },
    street: { type: String, default: '12 Main St.' },
    country: { type: String, default: 'Mars Colony 001' },
    dob: { type: String, default: '' },
    image: {
      type: String,
      default:
        'https://aqueous-brook-65256.herokuapp.com/img/default-avatar.jpg',
    },
  },
  { _id: false }
);

const Profile = mongoose.model('Profile', ProfileSchema);

exports.ProfileSchema = ProfileSchema;
exports.Profile = Profile;
