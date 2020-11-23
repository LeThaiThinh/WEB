var express = require('express');
var router = express.Router();
const Dish=require("../model/dish")
const reserveTable=require("../model/reserveTable");
const Table = require('../model/table');
const User = require('../model/user');
const {check,validationResult}=require('express-validator/check')
const {santitize, sanitize}=require('express-validator/filter');
function Redirect(req,res,params){
  if(req.session.login){
    res.redirect(`/${req.session.login}/user${params}`)
  }
}
var login;
/* Guest */
router.get('/', function(req, res, next) {
  console.log(req.session.login)
  Redirect(req,res,'')
  res.render('home/home', { title: 'home' });
});
// menu
router.get('/menu',async function(req,res,next){
  Redirect(req,res,'/menu')
  const dishes= await Dish.findAll({raw:true })
  res.render('menu/menu',  {title: 'menuUser', dishes});
});
router.post('/search',async function(req,res,next){ 
  var costOrder="";
  var ratingOrder="";
  var costLimit=1000;
  var availability="ALL";
  if(req.body.available){
    availability=req.body.available 
  }
  if(req.body.costOrder=="increase"){
    costOrder="ASC"
  }
  if(req.body.costOrder=="decrease"){
    costOrder="DESC"
  }
  if(req.body.ratingOrder=="increase"){
    ratingOrder="ASC"
  }
  if(req.body.ratingOrder=="decrease"){
    ratingOrder="DESC"
  }
  if(req.body.costLimit){
    costLimit=req.body.costLimit
  }
  const dishes= await Dish.findAll({
    raw:true ,
    order: [['cost', costOrder]],
    order: [['rating', ratingOrder]],
    where:{
      cost:{ 
        $between : [1, costLimit] 
      } ,
      //available:availability ,
    }
  })
  res.render('menu/menu',  {title: 'menuUser', dishes});
  
  //res.send(costOrder)
});
router.get('/menu/:id',async function(req,res,next){
  const id=req.params.id;
  const dish=await Dish.findOne({where:{id:id}});
  Redirect(req,res,`/menu/${id}`)
  res.render('menu/dishDetail',  {title: 'menu',dish});
});
//reserve
router.get('/reserve',async function(req,res,next){
  const tables= await Table.findAll({raw:true})
  Redirect(req,res,'/reserve')
  res.render('reserve/reserve', {title:'reserve',tables})
})
//signup
router.get('/signup',function(req,res,next){
  res.render('account/signup', { title: 'signup' });
});
router.post('/signup',
  [
  check('username').isLength({min:1}).withMessage('username must be specified').isAlphanumeric().withMessage('username must be alphanumeric'),
  check('password').isLength({min:6}).withMessage('invalid password,password is too short').isAlphanumeric().withMessage('name must be alphanumeric'),
  check('confirmPassword').custom((value,{req})=>value===req.body.password).withMessage('password do not match'),
  sanitize('*').trim().escape(),
  ],
  async function(req, res, next){
    username=req.body.username
    password=req.body.password
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      res.render('account/signup',{title:"pls fix these error",errors:errors.array()})

    }else{
    user=await User.findOne({where:{username:username}})
    if(user){
      res.render('account/signup', {title:'username already exist'})
    }
    else{
      user=req.body;
      User.create(user);
      req.session.login=username;
      Redirect(req,res,'')
    }
  }
});
//login
router.get('/login',function(req,res,next){
  res.render('account/login',{title:'Login to continue'});
})
router.post('/login',async (req,res,next)=>{
  username=req.body.username;
  password=req.body.password;
  user=await User.findOne({where:{username:username}});
  if(!user){
    res.render('account/login', {title:'wrong username'})
  }else if(user.password!=password){
    res.render('account/login', {title:'wrong password'})
  }else {
    req.session.login=username;
    login=username;
    Redirect(req,res,'')
  }
});
//logout
router.get('/logout', function(req, res, next) {
  //delete req.session.login;
  req.session.destroy();
  res.redirect('/');
});
module.exports = router;