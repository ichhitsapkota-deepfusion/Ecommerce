const Cart = require('../models/cart.model');

exports.getCartByUserId = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  
  return cart;
};

exports.addItemToCart = async (userId, productId, quantity = 1) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  return await cart.populate('items.product');
};

exports.clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) throw new Error('Cart not found');

  cart.items = [];
  await cart.save();
  return cart;
};

exports.removeItemFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });
  
  if (!cart) throw new Error('Cart not found');

  cart.items = cart.items.filter(item => item.product.toString() !== productId);
  
  await cart.save();
  return await cart.populate('items.product');
};