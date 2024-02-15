//Including mongoDb(Mongoose) in our code.
const mongoose = require("mongoose");

//Creating a function of Schema to communicate with database. 
const UserSchema = new mongoose.Schema(
    {
        //Every user must have a unqiue username of its own so it's required.
        username : 
        {
            type : String,
            require : true,
            unique : true,
        },
        //Every user must have a unqiue email of its own so it's required.
        email :
        {
            type : String,
            require : true,
            unique : true,
        },
        //Every user must create their own password but need not have to be unqire of its own so it's required.
        password :
        {
            type : String,
            require : true,
        },
        //To give access to our database we have Admin section which can be only given through database only.
        isAdmin :{
            type : Boolean,
            default : false,
        }
    },
    {timestamps : true}    //To showcase the changes in cart with respect to time.
);

//exporting all information from User as schema so we can use in Routers.
module.exports = mongoose.model("User",UserSchema);