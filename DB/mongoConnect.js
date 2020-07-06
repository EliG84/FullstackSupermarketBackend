const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(
    'mongodb+srv://speedtech:letsrock@speedtech.vyer8.gcp.mongodb.net/reactstore1',
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) return console.log(err);
      console.log('Connected to mongo');
    }
  );
};
