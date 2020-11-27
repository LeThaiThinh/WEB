const Sequelize = require('sequelize');
const Dish = require("./dish");
const Reservation = require("./reservation");
const User = require("./user");

User.hasMany(Reservation)
//Reservation.belongsTo(User)

Dish.sync(
    //{force:true}
    ).then(() => {
})
Reservation.sync(
    //{force:true}
    ).then(()=>{
})
User.sync(
    //{ force:true}
    ).then(() => {
});
Sequelize.sync
module.exports={Dish:Dish,Reservation:Reservation,User:User}