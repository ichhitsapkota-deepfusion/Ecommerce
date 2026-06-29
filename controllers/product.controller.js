const productService = require('../services/product.service');

exports.create = async (req, res) => {
  try {

    const { name, category, image } = req.body; 

    const newProduct = await productService.createProduct(name, category, image);
    
    res.status(201).json({ message: 'Product created successfully!', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};