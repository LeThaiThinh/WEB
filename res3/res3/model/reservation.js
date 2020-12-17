const Sequelize = require('sequelize');
const sequelize=require("./sequelize")
const Reservation=sequelize.define('reservations',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    datetime:{
        type:Sequelize.DATE,
        allowNull:false,
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

// Reservation.sync(
//     //{force:true}
//    ).then(()=>{
// })

module.exports=Reservation;
