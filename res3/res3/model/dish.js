const Sequelize = require('sequelize');
const pathSql = 'mysql://root:Root@localhost:3306/new_schema';
const sequelize = new Sequelize(pathSql, { 
  logging: false,
  define: {
      timestamps: false
  }
});
const Dish=sequelize.define('dish',{
    name:Sequelize.STRING,
    description:Sequelize.STRING,
    available:Sequelize.BOOLEAN,
    rating:Sequelize.INTEGER,
    cost:Sequelize.INTEGER,
    image:Sequelize.STRING,
})
Dish.sync().then(() => {
    console.log('New table created');
})
module.exports=Dish;
