const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create a Schema 
const  ItemSchema = new Schema({
    name :{
        type : String,
        required : true
    },

    amount :{
        type: Number,
        required : true
    },

    date: {
        type : Date,
        default : Date.now
    }
});

module.exports = Item = mongoose.model('item',ItemSchema)