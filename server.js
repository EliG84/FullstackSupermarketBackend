const express = require('express');
const cors = require('cors');
const mongoConnect = require('./DB/mongoConnect');

const app = express();
const port = 3001;

mongoConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin,X-Requested-With,Content-Type,Accept'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET,POST,PATCH,PUT,DELETE,OPTIONS'
//   );
//   next();
// });

const productRouter = require('./Routes/productRouter');

app.use('/api', productRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
