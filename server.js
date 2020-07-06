const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const https = require('https');
const fileUpload = require('express-fileupload');
const mongoConnect = require('./DB/mongoConnect');

const app = express();
const port = process.env.PORT || 3001;

mongoConnect();

app.use(cors());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productRouter = require('./Routes/productRouter');
const userRouter = require('./Routes/userRouter');

app.use('/api', productRouter);
app.use('/user', userRouter);

// https
//   .createServer(
//     {
//       key: fs.readFileSync('server.key'),
//       cert: fs.readFileSync('server.cert'),
//     },
//     app
//   )
//   .listen(port, () => {
//     console.log(`listening on port ${port}`);
//   });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
