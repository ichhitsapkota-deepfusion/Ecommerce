const categoryService = require('../services/category.service');



exports.getAll = async(req, res) => {
  console.log('GET request received for /categories');
  const data = await categoryService.getAllCategories();
  res.status(200).json({ message: 'Category fetched successfully!', categorys: data });
};

exports.create = async(req, res) => {

  const {title,category_image} = req.body;


  const newCategory = await categoryService.createCategory(title,category_image);
  
  console.log(newCategory)
  res.status(201).json({ message: 'Category created successfully!', category: newCategory });
};

exports.remove = (req, res) => {
  const categoryId = parseInt(req.params.id);


  const isDeleted = categoryService.deleteCategory(categoryId);

  if (!isDeleted) {
    return res.status(404).json({ message: 'Category not found' });
  }
    console.log(`DELETE request: Removed category ID -> ${categoryId}`);
  res.status(200).json({ message: 'Category deleted successfully' });
};

exports.update = (req, res) => {

  const categoryId = req.params.id;


  const frontendData = req.body;


  const updatedCategory = categoryService.updateCategory(categoryId, frontendData);

  if (!updatedCategory) {
    return res.status(404).json({ message: 'Category not found' });
  }

  console.log(`PUT request: Updated category ID -> ${categoryId}`);
  res.status(200).json({ message: 'Category updated!', category: updatedCategory });
};



