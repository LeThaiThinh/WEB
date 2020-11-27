const Sequelize = require('sequelize');
const pathSql = 'mysql://root:Cunmiu123@localhost:3306/new_schema';
const sequelize = new Sequelize(pathSql, { 
  logging: false,
  define: {
      timestamps: true
  }
});
const reserveTable=sequelize.define('reserveTables',{
    idreserve:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    idCustomer:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    date:{
        type:Sequelize.TIME,
        allowNull:false,
    },
    amountOfPeople:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    numberTable:{
        type:Sequelize.INTEGER,
    },
    callBack:{
        type:Sequelize.BOOLEAN,
    },

})
reserveTable.sync({force:true}).then(()=>{
    console.log('New table created');
})
module.exports=reserveTable;
