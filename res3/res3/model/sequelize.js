const Sequelize = require('sequelize');
const pathSql = 'mysql://root:Cunmiu123@localhost:3306/new_schema';
const sequelize = new Sequelize(pathSql, { 
  logging: false,
  define: {
      timestamps: false
  }
});
module.exports=sequelize