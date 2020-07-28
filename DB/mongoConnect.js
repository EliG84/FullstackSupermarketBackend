const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
  mongoose.connect(
    `mongodb+srv://${config.get('mUser')}:${config.get(
      'mPass'
    )}@speedtech.vyer8.gcp.mongodb.net/reactstore1`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) return console.log(err);
      console.log('Connected to mongo');
    }
  );
};
