var express = require('express');
var router = express.Router();
const Dish=require("../model/dish")
const BookingTable=require("../model/bookingTable");
/* Guest */
router.get('/', function(req, res, next) {
  res.render('home/home', { title: 'home' });
});
// menu
router.get('/menu',async function(req,res,next){
    const dishes= await Dish.findAll({raw:true})
    res.render('menu/menu',  {title: 'menu', dishes});
});
router.get('/menu/:id',async function(req,res,next){
  const dishId=req.params.id;
  const dish=await Dish.findOne({where:{id:dishId}});
  res.render('menu/dishDetail',  {title: 'menu',dish});
});
//login
router.get('/login',function(req,res,next){
  res.render('account/login',  {title: 'login'});
});
//signup
router.get('/signup',function(req,res,next){
  res.render('account/signup',  {title: 'signup'});
});
module.exports = router;