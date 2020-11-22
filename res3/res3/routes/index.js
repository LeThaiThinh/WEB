var express = require('express');
var router = express.Router();
const Dish=require("../model/dish")
const BookingTable=require("../model/bookingTable");
const Table = require('../model/table');
const User = require('../model/user');
const {check,validationResult}=require('express-validator/check')
const {santitize, sanitize}=require('express-validator/filter');

/* Guest */
router.get('/', function(req, res, next) {
  if(req.session.login){
    res.redirect(`/${req.session.login}/user`
    )}
  res.render('home/home', { title: 'home' });
});
// menu
router.get('/menu',async function(req,res,next){
  if(req.session.login){
    res.redirect(`/${req.session.login}/user/menu`)
  }
  const dishes= await Dish.findAll({raw:true })
  res.render('menu/menu',  {title: 'menuUser', dishes});
});
router.get('/menu/:id',async function(req,res,next){
  const id=req.params.id;
  const dish=await Dish.findOne({where:{id:id}});
  if(req.session.login){res.redirect(`/${req.session.login}/user/menu/${id}`)}
  res.render('menu/dishDetail',  {title: 'menu',dish});
});
//booking
router.get('/booking',async function(req,res,next){
  const tables= await Table.findAll({raw:true})
  if(req.session.login){
    res.redirect(`/${req.session.login}/user/booking`)
  }
  res.render('booking/booking', {title:'booking',tables})
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
      res.redirect(`/user/${user.username}`);
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
    console.log(req.session.login);
    res.redirect(`/${username}/user`);
  }
});
//logout
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
});
module.exports = router;