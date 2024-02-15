//Including mongoDb(Mongoose) in our code.
const mongoose = require("mongoose");

//Creating a function of Schema to communicate with database. 
const OrderSchema = new mongoose.Schema(
    {
        //Storing UserId because each user has its own order and to access it we can use UserId and get the particular order.
        userID :
        {
            type : String,      //data type
            require : true,     //To instruct if compulsory or not
        },
        //Product is mandatory because user can visit their order only if they have any products selected or have in cart.
        Products :
        {
           type : Array,
           require : true
        },
        //Amount is required as every product has its own price.
        total :
        {
            type : Number,    //data type
            require : true,   //To instruct if compulsory or not
        },
        //Ofcource address is required as user need to recieve the products somewhere.
        address :
        {
            type : Object,     //data type (Object as address can be multiple lines or  string + numbers or special characters.)
            require : true,     //To instruct if compulsory or not
        },
        quantity : {
            type : Number,
            require : true,
        },
        status :
        {
            type : String,     //data type
            default : "pending",      //Default the order will be pending mode.
        },
    },
    {timestamps : true}    //To showcase the changes in cart with respect to time.
);

//exporting all information from Orders as schema so we can use in Routers.
module.exports = mongoose.model("Order",OrderSchema);