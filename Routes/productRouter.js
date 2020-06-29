const express = require('express');
const Product = require('../Models/Product');
const router = express.Router();

router.get('/', (req, res) => {
  Product.find({}).then((data) => {
    res.json({ data });
  });
});

module.exports = router;
