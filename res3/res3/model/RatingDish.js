const Sequelize = require('sequelize');
const sequelize=require("./sequelize")
const RatingDish=sequelize.define('ratingDish',{
    rating:{
        type:Sequelize.INTEGER,
    },
})

module.exports=RatingDish;