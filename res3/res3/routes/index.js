var express = require('express');
var router = express.Router();
const Dish=require("../model/model")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'home' });
});
router.get('/menu',async function(req,res,next){
  const dishes=await Dish.findAll({raw:true});
  res.render('menu',  {title: 'menu',dishes});
});
router.get('/login',function(req,res,next){
  res.render('Account/login',  {title: 'login'});
});
router.get('/signup',function(req,res,next){
  res.render('Account/signup',  {title: 'signup'});
});
/*ADMIN*/
router.get('/admin',function(req,res,next){
  res.render('homeAdmin',  {title: 'homeAdmin'});
});
router.get('/admin/menu',async function(req,res,next){
  const dishes=await Dish.findAll({raw:true});
  res.render('menuAdmin',  {title: 'menuAdmin',dishes});
});
router.post('/admin/menu',async function(req,res,next){
  try{
      const dish=req.body;
      await Dish.create(dish)
      res.redirect('/admin/menu');
  }catch(error){
         next(error)
  }
});
module.exports = router;
