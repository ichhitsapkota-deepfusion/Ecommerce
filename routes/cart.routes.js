const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.use(verifyToken);

router.get('/',verifyToken, cartController.getCart);
router.post('/add',verifyToken, cartController.addItem);
router.delete('/clear', verifyToken, cartController.clearCart);
router.delete('/:productId', verifyToken, cartController.removeItem);

module.exports = router;