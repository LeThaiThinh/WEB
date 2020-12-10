const Sequelize = require('sequelize');
const Dish = require("./dish");
const RatingDish = require('./RatingDish');
const Reservation = require("./reservation");
const User = require("./user");

User.hasMany(Reservation)
Reservation.belongsTo(User)
Dish.belongsToMany(User,{through:RatingDish})
RatingDish.sync(
    {force:true}
    ).then(() => {
})
Dish.sync(
    // {force:true}
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
module.exports={Dish:Dish,Reservation:Reservation,User:User}