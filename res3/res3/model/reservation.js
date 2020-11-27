const Sequelize = require('sequelize');
const pathSql = 'mysql://root:Root@localhost:3306/new_schema';
const sequelize = new Sequelize(pathSql, { 
  logging: false,
  define: {
      timestamps: false
  }
});
const Reservation=sequelize.define('reservations',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    state:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    partySize:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
})

module.exports=Reservation;
