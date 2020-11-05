var express = require('express');
var router = express.Router();
const Dish=require("../model/model")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'home' });
});
router.get('/menu',async function(req,res,next){
  const dishes=await Dish.findAll({raw:true});
  res.render('menu/menu',  {title: 'menu',dishes});
});
router.get('/menu/:id',async function(req,res,next){
  const dishId=req.params.id;
  const dish=await Dish.findOne({where:{id:dishId}});
  res.render('menu/dishDetail',  {title: 'menu',dish});
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
  res.render('menu/menuAdmin',  {title: 'menuAdmin',dishes});
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
router.get('/admin/menu/:id',async function(req,res,next){
  const dishId=req.params.id;
  const dish=await Dish.findOne({where:{id:dishId}});
  res.render('menu/dishDetailAdmin',  {title: 'menu',dish});
});
router.post('/admin/menu/:id/remove',async function(req,res,next){
  const dishId=req.params.id;
  await Dish.destroy({where:{id:dishId}})
  res.redirect('/admin/menu')
});
router.get('/admin/menu/:id/edit',async function(req,res,next){
  const dishes=await Dish.findAll({raw:true});
  res.render('menu/edit',  {title: 'edit',dishes});
});
router.post('/admin/menu/:id/edit',async function(req,res,next){
  try{
      const dish=req.body;
      const dishId=req.params.id;
      await Dish.update(dish,
        {where:{id:dishId}}
        )
      res.redirect('/admin/menu');
  }catch(error){
         next(error)
  }
});
module.exports = router;