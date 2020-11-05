const mongoose=require('mongoose');
const dishesSchema=new mongoose.Schema({
    name:{
        type:String,
        required:'dishes name is required',
        max:32,
        trim:true,
    },
    description:{
        type:String,
        required:'Dishes description is required',
        trim:true,
    },
    image: String,
    starRating:{
        type:Number,
        required:'Dishes rating star is required',
        max:5
    },
    country:{
        type:String,
        required:'Country is required',
        trim:true,
    },
    cost:{
        type:Number,
        required:'Cost is required',
    },
    available:{
        type:Boolean,
        required:'Availability is required',
    },
});
dishesSchema.index({
    name:'text',
    country:'text'
})
module.exports=mongoose.model('Dish',dishesSchema);