const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        
        
    },

    image: {
        type: String, 
        required: true,
        
    },

    price:{
        type: Number,
        required: true,
        minLength: [0, 'The price must be a positive number!']
    },

    description:{
        type: String,
        required: true,
        
    },

    genre: {
        type: String,
        required: true,
        minLength: [2, 'Too short genre input!']
    }, 

    platform:{
        type: String, 
        required: true,
        enum: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'],
    },

    boughtBy: [{  
     type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],

      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },

});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;