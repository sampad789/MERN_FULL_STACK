const express = require('express');
const router = express.Router();

// Item Model 
const Item = require ('../../modals/Item');

// setting up the GET route for all items ,

router.get('/', (req,res)=>{
    Item.find()
    .sort({date:-1})
    .then(items => res.json(items))
});

// setting up the POST route for  items 

router.post('/',(req,res)=>{
    const newItem = new Item({
        name : req.body.name ,
        amount:req.body.amount
    }); 
    newItem.save().then(item =>res.json(item));
});

// Setting up the Delete route for a single item 

router.delete('/:id',(req,res)=>{
    Item.findById(req.params.id)
    .then (item => item.remove().then(()=> res.json({success:true}))
    ).catch(e => res.status(404).json({success: fail}))
}); 


module.exports= router;