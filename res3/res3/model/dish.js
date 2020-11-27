const Sequelize = require('sequelize');
const pathSql = 'mysql://root:Root@localhost:3306/new_schema';
const sequelize = new Sequelize(pathSql, { 
  logging: false,
  define: {
      timestamps: false
  }
});
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
    rating:{
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

Dish.sync({force:true}).then(() => {
    console.log('New table created');
})
module.exports=Dish;
