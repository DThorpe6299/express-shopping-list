const Item = require('./item')
const express = require("express");

const router = express.Router();


router.get('/items', (req, res, next)=>{
    try{
        return res.json({items:Item.allItems()});
    }catch(e){
        next(e);
    }
})

router.post('/items', (req, res, next)=>{
    try{
        if(!req.body.name || !req.body.price) throw new ExpressError("Name and price are required.", 400);
        let newItem= new Item(req.body.name, req.body.price);
        console.log(newItem);
        return res.status(201).json({added: newItem})
    }catch(e){
        next(e)
    }
})

router.get('/items/:name', (req,res,next)=>{
    try{
        if(!req.params.name) throw new ExpressError("Name is required.", 400);
        let itemName = Item.findItem(req.params.name);
        console.log(itemName)
        if (!itemName) throw new ExpressError("Item not found.", 404);
        return res.json({item:itemName});
    }catch(e){
        next(e)
    }
})

router.patch('/items/:name', (req, res, next)=>{
    try{
        let foundItem = Item.update(req.params.name, req.body);
        if (!foundItem) throw new ExpressError("Item not found.", 404);
        return res.json({ item: foundItem });
        }catch(e){
        next(e);
    }
})

router.delete('/items/:name',(req,res,next)=>{
    try{
        if(!req.params.name) throw new ExpressError("Name is required.", 400);
        Item.delete(req.params.name);
        return res.json({message:'Deleted'});
    }catch(e){
        next(e);
    }
})

module.exports=router;