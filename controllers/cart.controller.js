const cartService = require('../services/cart.service');

exports.getCart = async (req, res) => {
  try {
    const cart = await cartService.getCartByUserId(req.user.id);
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await cartService.addItemToCart(req.user.id, productId, quantity);
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await cartService.clearCart(req.user.id);
    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await cartService.removeItemFromCart(req.user.id, productId);
    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};