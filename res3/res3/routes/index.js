var express = require('express');
const Op = require('sequelize').Op;
var router = express.Router();
const sequelize=require("../model/sequelize")
const {Dish,Reservation,User,RatingDish,Menu}=require("../model/relation")
const {check,validationResult}=require("express-validator")
const {santitize, sanitize}=require("express-validator")
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
  const dishes= await Dish.findAll({
    include:[{
      model:User,
      through:{
        attributes: [
          "rating",
        ],
      },
    }],
    attributes: [
      "id","nameDish","description","cost","image","available",
      [sequelize.fn('AVG', sequelize.col('users.ratingDish.rating')), 'ratingAvg']
    ],
    group:["id"],
    raw:true,
    
    })
  res.render('menu/menu',  {title: 'menu', dishes:dishes});
});
router.post('/search',async function(req,res,next){ 
  var costOrder="";
  var ratingOrder="";
  var costMax=1000;
  var costMin=0;
  var availability=[0,1];
  var nameDish="";
  if(req.body.available){
    availability=[req.body.available]
  }
  if(req.body.nameDish){
    nameDish=req.body.nameDish
  }
  if(req.body.order=="increaseCost"){
    costOrder="ASC"
  }
  if(req.body.order=="decreaseCost"){
    costOrder="DESC"
  }
  if(req.body.order=="increaseRating"){
    ratingOrder="ASC"
  }
  if(req.body.order=="decreaseRating"){
    ratingOrder="DESC"
  }
  if(req.body.costMax){
    costMax=req.body.costMax
  }
  if(req.body.costMin){
    costMin=req.body.costMin
  }
  var dishes
  if(costOrder){
    dishes= await Dish.findAll({
      raw:true ,
      include:[{
        model:User,
        through:{
          attributes: [
            "rating",
          ],
          group:["dishId"],
        },
      }],
      attributes: [
        "id","nameDish","description","cost","image","available",
        [sequelize.fn('AVG', sequelize.col('users.ratingDish.rating')), 'ratingAvg']
      ],
      group:["dishId"],
      order: [['cost', costOrder]],
      where:{
        [Op.and]: [
          {'nameDish':{[Op.substring]: nameDish}},
          { 'cost': {[Op.between]: [costMin, costMax]}},
          {'available':{[Op.in]:availability}} ,
        ]     
      }
      }) 
  }
  if(ratingOrder){
    dishes= await Dish.findAll({
      raw:true ,
      include:[{
        model:User,
        through:{
          attributes: [
            "rating",
          ],
        },
      }],
      attributes: [
        "id","nameDish","description","cost","image","available",
        [sequelize.fn('AVG', sequelize.col('users.ratingDish.rating')), 'ratingAvg']
      ],
      group:["dishId"],
      order: [[sequelize.literal(`ratingAvg ${ratingOrder}`)]],
      where:{
        [Op.and]: [
          {'nameDish':{[Op.substring]: nameDish}},
          { 'cost': {[Op.between]: [costMin, costMax]}},
          {'available':{[Op.in]:availability}} ,
        ]     
      }
      })
  }
  res.render('menu/menu',  {title: 'menu', dishes});
});
router.get('/menu/:id',async function(req,res,next){
  const id=req.params.id;
  Redirect(req,res,`/menu/${id}`)
  const dish=await Dish.findOne({where:{id:id}});
  res.render('menu/dishDetail',  {title: 'menu',dish});
});
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
    const username=req.body.username
    const password=req.body.password
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
      if(username=="Admin")
        res.redirect("/admin")
      else
        Redirect(req,res,'')
    }
  }
});
//login
router.get('/login',function(req,res,next){
  res.render('account/login',{title:'Login to continue'});
})
router.post('/login',async (req,res,next)=>{
  const username=req.body.username;
  const password=req.body.password;
  const user=await User.findOne({where:{username:username}});
  if(!user){
    res.render('account/login', {title:'wrong username'})
  }else if(user.password!=password){
    res.render('account/login', {title:'wrong password'})
  }else {
    req.session.login=username;
    login=username;
    if(username=="Admin")
      res.redirect('/admin')
    else
      Redirect(req,res,'')
  }
});
//logout
router.get('/logout', function(req, res, next) {
  //delete req.session.login;
  req.session.destroy();
  res.redirect('/');
});
router.get('/reserve',async function(req,res,next){
  Redirect(req,res,'/reserve')
})
module.exports = router;