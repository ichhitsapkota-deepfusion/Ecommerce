const categoryModel = require('../models/category.model');


exports.getAllCategories = async() => {

    const allUsers = await categoryModel.find();

    return allUsers

};




exports.createCategory = async(title,category_image) => {

    const newCategory = new categoryModel({
    title,
    category_image
    });


    const savedCategory = await newCategory.save();
    console.log(savedCategory,"saved")

  return savedCategory;
};







// exports.updateCategory = (id, data) => {
//   const categoryIndex = categories.findIndex(c => c.id === id);
//   if (categoryIndex === -1) return null;

//   categories[categoryIndex] = {
//     ...categories[categoryIndex],
//     ...data
//   };
//   return categories[categoryIndex];
// };

exports.deleteCategory = (id) => {
  const initialLength = categories.length;
  categories = categories.filter(c => c.id !== id);
  

  return categories.length !== initialLength; 
};