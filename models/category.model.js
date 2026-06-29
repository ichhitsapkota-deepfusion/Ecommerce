const mongoose = require('mongoose');

const catrgorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true 
  },
  
  category_image:{
    type: String,
    required: true,
  }
  
}, { 
  timestamps: true 
});



module.exports = mongoose.model('Category', catrgorySchema);