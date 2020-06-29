const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(
    'mongodb://localhost:27017/reactstore1',
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) return console.log(err);
      console.log('Connected to mongo');
    }
  );
};
