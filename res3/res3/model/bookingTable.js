const Sequelize = require('sequelize');
const pathSql = 'mysql://root:Root@localhost:3306/new_schema';
const sequelize = new Sequelize(pathSql, { 
  logging: false,
  define: {
      timestamps: false
  }
});
const BookingTable=sequelize.define('bookingTable',{
    //customer:{
    name:Sequelize.STRING,
    dateOfBirth:Sequelize.DATEONLY,
    phone:Sequelize.STRING,
    //},
    date:Sequelize.DATE,
    amountOfPeople:Sequelize.INTEGER,
    //table:{
        number:Sequelize.INTEGER,
        occupied:Sequelize.BOOLEAN,
    //},
    callBack:Sequelize.BOOLEAN,

})
BookingTable.sync().then(()=>{
    console.log('New table created');
})
module.exports=BookingTable;
