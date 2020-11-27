const Sequelize = require('sequelize');
const pathSql = 'mysql://root:Cunmiu123@localhost:3306/new_schema';
const sequelize = new Sequelize(pathSql, { 
  logging: false,
  define: {
      timestamps: false
  }
});
const Table=sequelize.define('tables',{
    numberTable:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    occuppied:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
    },
})
Table.sync().then(() => {
    console.log('New table created');
});
module.exports=Table