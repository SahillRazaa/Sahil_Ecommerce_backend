const router = require("express").Router();
const Cart = require("../models/Cart");
const {verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyToken} = require("./verifyToken");

//Creating Cart
router.post("/create",verifyToken, async(req,res)=>{
    const newCart = new Cart(
       {
        userID : req.body.user,
        Products : req.body.product,
        total : req.body.total,
        quantity : req.body.quantity,
       }
        );
    try{
        const createdCart = await newCart.save();
        res.status(200).json(createdCart);
    }catch(err)
    {
        res.status(500).json(err);
    }
});

//Updating Cart
router.put("/update/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
           $set : req.body 
        },{new : true});
        res.status(200).json(updatedCart);
    }catch(err)
    {
        res.status(500).json(err);
    }
});

//Deleting Cart
router.delete("/deleteCart", verifyToken, async (req,res)=>{
    try{
        await Cart.findOneAndDelete({userID : req.body.user});
        res.status(200).json("Cart has been deleted successfully.");
    }catch(err)
    {
        res.status(500).json(err);
    }
});

//Get Cart
router.get("/findCart", verifyToken, async (req, res) => {
    try {
      const cart = await Cart.find({ userID: req.query.user });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//Get all Carts
router.get("/findAllCart", verifyTokenAndAdmin, async(req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(err)
    {
        res.status(500).json(err);
    }
});

module.exports = router;