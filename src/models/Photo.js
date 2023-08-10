const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        
        
    },

    image: {
        type: String, 
        required: [true, 'Image is required'],
        
    },

    price:{
        type: Number,
        required: [true, 'Price is required'],
        minLength: [0, 'The price must be a positive number!']
    },

    description:{
        type: String,
        required: [true, 'Description is required'],
        
    },

    genre: {
        type: String,
        required: [true, 'Genre is required'],
        minLength: [2, 'Too short genre input!']
    }, 

    platform:{
        type: String, 
        required: [true, 'Platform is required'],
        enum: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'],
    },

    boughtBy: {  
     type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },

      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },

});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;