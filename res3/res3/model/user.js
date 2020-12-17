const Sequelize = require('sequelize');
const sequelize=require("./sequelize")
const User=sequelize.define('users',{
    username:{
        type:Sequelize.STRING,
        allowNull:false,
    },    
    dateOfBirth:{
        type:Sequelize.DATEONLY,
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:Sequelize.STRING,
        required: 'password is requied',
    }    
})

// User.sync(
//    // { force:true}
//    ).then(() => {
// });

module.exports=User
