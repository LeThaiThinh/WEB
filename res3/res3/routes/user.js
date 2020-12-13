var express = require('express');
var router = express.Router();
const Op = require('sequelize').Op;
const {Dish,Reservation,User,RatingDish}=require("../model/relation")
var app = express();
/* GET userlisting. */
router.get('/:username/user/',async function(req, res, next) {
  const username=req.params.username;
  const user=await User.findOne({where:{username: username}}) 
  res.render('home/homeUser', { title: 'homeUser' ,user});
});
// menu
router.get('/:username/user/menu',async function(req,res,next){
  try{
    const username=req.params.username;
    const user=await User.findOne({where:{username: username}}) 
    const dishes= await Dish.findAll({raw:true})
    res.render('menu/menuUser',  {title: 'menu', dishes:dishes,user:user});
  }catch(error){
    next(error)
  }
});
router.post('/:username/user/search',async function(req,res,next){ 
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
      order: [['rating', ratingOrder]],
      where:{
        [Op.and]: [
          {'nameDish':{[Op.substring]: nameDish}},
          { 'cost': {[Op.between]: [costMin, costMax]}},
          {'available':{[Op.in]:availability}} ,
        ]     
      }
      })
  }
  const username=req.params.username;
  const user=await User.findOne({where:{username: username}}) 
  res.render('menu/menu',  {title: 'menu', dishes:dishes,user:user});
});
router.get('/:username/user/menu/:id',async function(req,res,next){
  const id=req.params.id;
  const dish=await Dish.findOne({where:{id:id}});
  const username=req.params.username;
  const user=await User.findOne({where:{username: username}}) 
  res.render('menu/dishDetailUser',  {title: 'menu',dish:dish,user:user});
});
router.post('/:username/user/menu/:id/rate',async function(req,res,next){
  const username=req.params.username
  
  //res.json(req.body.rating)
  if(req.body.rating==null){
    res.redirect(`/${username}/user/menu/${req.params.id}`)
  } 
  var ratingDish=req.body
  
  
  const user=await User.findOne({where:{username: req.params.username}})
  ratingDish.dishId=req.params.id
  ratingDish.userId=user.id
  //res.json(ratingDish)
  await RatingDish.create(ratingDish);
  res.redirect(`/${username}/user/menu/${req.params.id}`)
});
//reservation
router.get('/:username/user/reserve',async function(req,res,next){
  const username=req.params.username;
  
  const user=await User.findOne({where:{username: username}})
  const pendingReservation=await user.getReservations({
    where:{
      state:{
        [Op.and]:{
          [Op.not]:"done",
          [Op.not]:"cancel",
          }
        }
  }})
  const reservations=await user.getReservations({
    where:{
      state:{
        [Op.or]:[
          { [Op.like]:"done"},
          { [Op.like]:"cancel"},
        ]}
  }})
  // res.json(reservation)
  res.render('reserve/reserveUser', {title:'reserve',pendingReservation:pendingReservation,user:user,reservations:reservations})
})
router.post('/:username/user/reserve',async function(req,res,next){
  try{
    const username=req.params.username;
    const user=await User.findOne({where:{username: username}})  
    const reservation=req.body
    reservation.state="await"
    reservation.userId=user.id
    await Reservation.create(reservation)
    res.redirect(`/${req.params.username}/user/reserve`)
  }catch(err){
    console.log(err);
  }
})
router.post('/:username/user/reserve/:id/cancel',async function(req,res,next){
    
    const r=await Reservation.update(
        {state:"cancel"},
        {
        include:[{
          model:User ,
          where:{
          username:req.params.username
          }
        }],
        where:{
          id:req.params.id
        }
    })
    //res.json(r)
    res.redirect(`/${req.params.username}/user/reserve`)
})

//account
router.get('/:username/user/profile',async function(req, res, next) {
  const username=req.params.username;
  const user=await User.findOne({where:{username: username}}) 
  res.render('Account/accountDetailUser', { title: 'homeUser' ,user});
});
module.exports = router;
