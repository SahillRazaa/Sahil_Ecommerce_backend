//Including mongoDb(Mongoose) in our code.
const mongoose = require("mongoose");

//Creating a function of Schema to communicate with database. 
const CartSchema = new mongoose.Schema(
    {
        //Storing UserId because each user has its own cart and to access it we can use UserId and get the particular cart.
        userID :
        {
            type : String,         //data type
            require : true,       //To instruct if compulsory or not
        },

        //ProductId is not mandatory because user can visit their cart even if they do not add any products.
        Products :
        {
           type : Array,
           require : true
        },

        total : {
            type : Number,
            require : true,
        },
        quantity : {
            type : Number,
            require : true,
        },
    },
    {timestamps : true}  //To showcase the changes in cart with respect to time.
);

//exporting all information from Carts as schema so we can use in Routers.
module.exports = mongoose.model("Cart",CartSchema);