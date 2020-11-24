const Sequelize = require('sequelize');
const pathSql = 'mysql://root:Root@localhost:3306/new_schema';
const sequelize = new Sequelize(pathSql, { 
  logging: false,
  define: {
      timestamps: false
  }
});
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
User.sync(
    //{ force:true}
    ).then(() => {
    console.log('New table created');
});

module.exports=User
