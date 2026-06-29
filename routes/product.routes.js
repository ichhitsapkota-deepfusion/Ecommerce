const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { validateCreateProduct } = require('../middlewares/product.dto');

router.get('/', productController.getAll)
router.post('/', validateCreateProduct, productController.create);


module.exports = router;