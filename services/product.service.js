const Product = require('../models/product.model');

exports.createProduct = async (name, categoryId, image) => {
  const newProduct = new Product({
    name,
    category: categoryId,
    image
  });

  const savedProduct = await newProduct.save();
  return savedProduct;
};

exports.getAllProducts = async () => {
  return await Product.find(); 
};

exports.searchProducts = async (searchTerm) => {
  return await Product.find({ 
    name: { $regex: searchTerm, $options: 'i' } 
  });
};






exports.getProductsByCategory = async (categoryId) => {

  
  return await Product.find({ category: categoryId });

};