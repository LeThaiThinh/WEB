var express = require('express');
var router = express.Router();
const Op = require('sequelize').Op;
const {Dish,Reservation,User}=require("../model/relation")
var app = express();
/* GET userlisting. */
router.get('/:username/user/', function(req, res, next) {
  res.render('home/homeUser', { title: 'homeUser' });
});
// menu
router.get('/:username/user/menu',async function(req,res,next){
  try{
    const dishes= await Dish.findAll({raw:true})
    res.render('menu/menuUser',  {title: 'menu', dishes:dishes});
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
  res.render('menu/menu',  {title: 'menu', dishes});
});
router.get('/:username/user/menu/:id',async function(req,res,next){
  const id=req.params.id;
  const dish=await Dish.findOne({where:{id:id}});
  res.render('menu/dishDetail',  {title: 'menu',dish:dish});
});
//reservation
router.get('/:username/user/reserve',async function(req,res,next){
  const username=req.params.username;
  const user=await User.findOne({where:{username: username}})
  const pendingReservation=await user.getReservations({where:{state:{[Op.not]:"done"}}})
  res.render('reserve/reserveUser', {title:'reserve',pendingReservation:pendingReservation})
})
router.post('/:username/user/reserve',async function(req,res,next){
  try{
    const username=req.params.username;
    const user=await User.findOne({where:{username: username}})  
    const reservation=req.body
    reservation.state="await"
    reservation.userId=user.id
    await Reservation.create(reservation)
  res.redirect('/:username/user/reserve')
  }catch(err){
    console.log(err);
  }
  
  //res.render('reserve/reserveUser', {title:'reserve'})
})

module.exports = router;
