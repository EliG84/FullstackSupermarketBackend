const express = require('express');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const mongoConnect = require('./DB/mongoConnect');

const app = express();
const port = 3001;

mongoConnect();

app.use(fileUpload());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const productRouter = require('./Routes/productRouter');
const userRouter = require('./Routes/userRouter');

app.use('/api', productRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
