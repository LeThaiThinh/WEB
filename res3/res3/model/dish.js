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
    // menuId: {
    //     type: Sequelize.INTEGER,
    //     references:{
    //         model:'menus', // <<< Note, its table's name, not object name
    //         key: 'id' // <<< Note, its a column name
    //     }
//   }
})


module.exports=Dish;
