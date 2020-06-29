const express = require('express');
const cors = require('cors');
const mongoConnect = require('./DB/mongoConnect');

const app = express();
const port = 3001;

mongoConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const productRouter = require('./Routes/productRouter');

app.use('/api', productRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
