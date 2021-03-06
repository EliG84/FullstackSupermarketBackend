const express = require('express');
const { Product } = require('../Models/Product');
const router = express.Router();

router.get('/', (req, res) => {
  Product.find({}).then((data) => {
    res.json(data);
  });
});

router.get('/single/:id', (req, res) => {
  Product.findById(req.params.id).then((data) => {
    res.json(data);
  });
});

router.get('/:cat', (req, res) => {
  Product.find({ category: req.params.cat }).then((data) => {
    res.json(data);
  });
});

router.get('/search/:q', (req, res) => {
  const mySearch = new RegExp(`${req.params.q}`);
  Product.find({ $or: [{ name: mySearch }, { info: mySearch }] })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post('/addProduct', (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    info: req.body.info,
    image: req.body.image,
  });
  newProduct.save().then((data) => {
    res.json(data);
  });
});

module.exports = router;
