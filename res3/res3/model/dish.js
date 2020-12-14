const Sequelize = require('sequelize');
const sequelize=require("./sequelize")
const Dish=sequelize.define('dishes',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    nameDish:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false,
    },   
    cost:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    image:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    available:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
    },
})


module.exports=Dish;
