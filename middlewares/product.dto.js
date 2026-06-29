// middlewares/product.dto.js

exports.validateCreateProduct = (req, res, next) => {
  const { name, category, image } = req.body;

  if (!name || !category || !image) {
    return res.status(400).json({ error: "Name, category, and image are required." });
  }

  req.body = { name, category, image };


  next(); 
};