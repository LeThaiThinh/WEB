const Sequelize = require('sequelize');
const sequelize=require("./sequelize")
const Menu=sequelize.define('menus',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    count:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }
})
// Menu.sync(
//     { force:true}
//    ).then(() => {
// });
module.exports=Menu;
