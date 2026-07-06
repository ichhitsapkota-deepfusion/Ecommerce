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

exports.search = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const products = await productService.searchProducts(query);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    if (!categoryId) {
      return res.status(400).json({ error: 'Category ID is required' });
    }

    const products = await productService.getProductsByCategory(categoryId);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};