const router = require("express").Router();
const Order = require("../models/Order");
const {verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyToken} = require("./verifyToken");

//Creating Order
router.post("/create",verifyToken, async(req,res)=>{
    const newOrder = new Order(
        {
        userID : req.body.user,
        Products : req.body.product,
        total : req.body.total,
        quantity : req.body.quantity,
        }
    );
    try{
        const createdOrder = await newOrder.save();
        res.status(200).json(createdOrder);
    }catch(err)
    {
        res.status(500).json(err);
    }
});

//Updating Order
router.put("/update/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
           $set : req.body 
        },{new : true});
        res.status(200).json(updatedOrder);
    }catch(err)
    {
        res.status(500).json(err);
    }
});

//Deleting Order
router.delete("/delete/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted successfully.");
    }catch(err)
    {
        res.status(500).json(err);
    }
});

//Get Order
router.get("/findOrder", verifyToken, async (req,res)=>{
    try{
        const orders = await Order.find({userId : req.params.user});
        res.status(200).json(orders);
    }catch(err)
    {
        res.status(500).json(err);
    }
});

//Get all Carts
router.get("/find", verifyTokenAndAdmin, async(req,res)=>{
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }catch(err)
    {
        res.status(500).json(err);
    }
});

// Get Monthly Sale income

router.get("/income", verifyTokenAndAdmin, async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1)); 
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));

    try{
        const income = await Order.aggregate([
           { $match : { createdAt : { $gte : previousMonth } } },
            {
                $project: {
                    month : {$month : "$createdAt"},
                    sales : "$amount",
                },
            },
            {
                $group : {
                _id : "$month",
                total : {$sum : "$sales"},
            },
        },
        ]);
        res.status(200).json(income);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;