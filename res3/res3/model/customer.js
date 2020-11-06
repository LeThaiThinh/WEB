const Sequelize = require('sequelize');
const pathSql = 'mysql://root:Root@localhost:3306/new_schema';
const sequelize = new Sequelize(pathSql, { 
  logging: false,
  define: {
      timestamps: false
  }
});
const Customer=sequelize.define('customer',{
    name:Sequelize.STRING,
    dateOfBirth:Sequelize.DATEONLY,
    phone:Sequelize.STRING,
})
const Table=sequelize.define('table',{
    number:Sequelize.INTEGER,
    occupied:Sequelize.BOOLEAN
})