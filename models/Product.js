//Including mongoDb(Mongoose) in our code.
const mongoose = require("mongoose");

//Creating a function of Schema to communicate with database. 
const ProductSchema = new mongoose.Schema(
    {
        //Admin cannont add any product without title and it should be unqiue
        title :
        {
            type : String,
            require : true,
            unique : true,
        },
        //A small description is must about the product
        description :
        {
            type : String,
            require : true,
        },
        //Some image should get displayed so its compulsory
        image :
        {
            type: String,
            require : true,
        },
        //Admin can add categories or may not.
        categories :
        {
            type : Array,
        },
        //Color is also not mandatory
        color :
        {
            type : Array,
        },
        //But price is compulsory as every product have some price.
        price :
        {
            type : Number,
            require : true,
        },
        //If our product is present in stock to sell or not, hence compulsory.
        instrock :
        {
            type : Boolean,
            require : true,
        },
    },
    {timestamps : true}    //To showcase the changes in cart with respect to time.
);

//exporting all information from Products as schema so we can use in Routers.
module.exports = mongoose.model("Product",ProductSchema);