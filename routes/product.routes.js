const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { validateCreateProduct } = require('../middlewares/product.dto');
const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/', productController.getAll)

router.post('/',verifyToken, validateCreateProduct,productController.create);

router.get('/search', productController.search);

router.get('/category/:categoryId', productController.getByCategory);


module.exports = router;