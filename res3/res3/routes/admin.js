var express = require('express');
var router = express.Router();
const Op = require('sequelize').Op;
const sequelize=require("../model/sequelize")
const {Dish,Reservation,User,RatingDish,Menu}=require("../model/relation")
/*ADMIN*/
// home
router.get('/',function(req,res,next){
    try{
    res.render('home/homeAdmin',  {title: 'homeAdmin'});
    }catch(error){
        next(error);
    }
});
//menu
router.get('/menu',async function(req,res,next){
  try{
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
    group:["Id"],
    raw:true,
    
    })
    console.log(dishes)
    res.render('menu/menuAdmin',  {title: 'menu', dishes:dishes});
  }catch(error){
    next(error)
  }
});
router.post('/menu',async function(req,res,next){
    try{
        const dish=req.body;
        await Dish.create(dish)
        res.redirect('/admin/menu');
    }catch(error){
           next(error)
    }
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
  }else costMax=100000
  if(req.body.costMin){
    costMin=req.body.costMin
  }else costMin=0
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
      through:[{
        model: RatingDish,
        order: [['rating', ratingOrder]],
      }],
      raw:true ,
      where:{
        [Op.and]: [
          {'nameDish':{[Op.substring]: nameDish}},
          { 'cost': {[Op.between]: [costMin, costMax]}},
          {'available':{[Op.in]:availability}} ,
        ]     
      }
      })
  }
  const search=req.body
  // res.json(search)
  res.render('menu/menuAdmin',  {title: 'menu', search:search,dishes:dishes,});
});
router.get('/menu/:id',async function(req,res,next){
    const id=req.params.id;
    const dish=await Dish.findOne({where:{id:id}});
    res.render('menu/dishDetailAdmin',  {title: 'dishDetailAdmin',dish});
});
router.post('/menu/:id/remove',async function(req,res,next){
    const id=req.params.id;
    await Dish.destroy({where:{id:id}})
    res.redirect('/admin/menu')
});
router.get('/menu/:id/edit',async function(req,res,next){
    const id=req.params.id
    const dish=await Dish.findOne({raw:true,where:{id:id}});
    res.render('menu/edit',  {title: 'edit',dish});
});
router.post('/menu/:id/edit',async function(req,res,next){
    try{
        const dish=req.body;
        const id=req.params.id;
        await Dish.update(dish,
          {where:{id:id}}
          )
        res.redirect('/admin/menu');
    }catch(error){
           next(error)
    }
});
//reserve
router.get('/reserve',async function(req,res,next){
    const reservations=await Reservation.findAll({
      include:[User],
      order:[["id","DESC"]],
      where:{
      state:"Pending"
    }})
    console.log(reservations)

    res.render('reserve/reserveAdmin', {title:'reserve', reservations:reservations})
})
router.post('/reserve/search',async function(req,res,next){
  const search=req.body
  try{
    const reservations=await Reservation.findAll({
      include:[{
      model:User,
      where:{
        [Op.and]: [
          {'username':{[Op.substring]:search.username}},
          {'phone':{[Op.substring]: search.phone}},
          {'username':{[Op.notLike]:"Admin"}},
        ] 
       }
      }],
      order:[["id","DESC"]],
      where:{
      state:"Pending"
      }
    })
    console.log(reservations)
    res.render('reserve/reserveAdmin',{title:'reserveAdmin',reservations:reservations,search:search})
  }catch(error){
    next(error)
  }
})  
router.get('/reserve/history',async function(req,res,next){
  
  const reservationsDone=await Reservation.findAll({
    include:[User],
    order:[["id","DESC"]],
    where:{
    state:{[Op.or]:[
      {[Op.like]:"done"},
      {[Op.like]:"cancelled"},
    ]}
    }
  })
  res.render('reserve/reserveAdminHistory', {title:'reserve', reservationsDone:reservationsDone})
})
router.post('/reserve/search/history',async function(req,res,next){
  const search=req.body
  try{
    const reservationsDone=await Reservation.findAll({
      include:[{
      model:User,
      where:{
        [Op.and]: [
          {'username':{[Op.substring]:search.username}},
          {'phone':{[Op.substring]: search.phone}},
          {'username':{[Op.notLike]:"Admin"}},
        ] 
       }
      }],
      order:[["id","DESC"]],
      where:{
      state:{[Op.or]:[
        {[Op.like]:"done"},
        {[Op.like]:"cancelled"},
      ]}
      }
    })
    console.log(reservationsDone)
    res.render('reserve/reserveAdminHistory',{title:'reserveAdminHistory',reservationsDone:reservationsDone,search:search})
  }catch(error){
    next(error)
  }
}) 
router.post('/reserve/edit/:id',async function(req,res,next){
  datetime=req.body.datetime
  partySize=req.body.partySize
  if(partySize!=""){
    await Reservation.update({partySize:partySize},
      {where:{id:req.params.id}}
    )
  }
    
  if(datetime!=""){
    await Reservation.update({datetime:datetime},
      {where:{id:req.params.id}}
    )
  }
  console.log(req.body)
  res.redirect('/admin/reserve')
})
router.post('/reserve/remove/:id',async function(req,res,next){
  await Reservation.update({state:"cancelled"},
    {where:{id:req.params.id}}
  )
  res.redirect('/admin/reserve')
})
router.post('/reserve/confirm/:id',async function(req,res,next){
  await Reservation.update({state:"done"},
    {where:{id:req.params.id}}
  )
  res.redirect('/admin/reserve')
})
router.get('/reserve/:username',async function(req,res,next){
  try{
    const username=req.params.username;
  const user=await User.findOne({where:{username: username}})
  const pendingReservation=await user.getReservations({
    where:{
      state:"Pending"
  }})
  const reservations=await user.getReservations({
    where:{
      state:{
        [Op.or]:[
          { [Op.like]:"done"},
          { [Op.like]:"cancelled"},
        ]}
  }})
  // res.json(reservation)
  res.render('reserve/reserveDetailAdmin', {title:'reserve',pendingReservation:pendingReservation,user:user,reservations:reservations})
  }catch(err){
    console.log(err);
  }
})
//account
router.get('/account',async function(req,res,next){
  try{
    const users=await User.findAll({
      raw:true,
      where:{
        username:{[Op.notLike]:"Admin"}
      }
    })
    res.render('account/accountAdmin',{title:'accountAdmin',users})
  }catch(error){
    next(error)
}
})
router.post('/account/search',async function(req,res,next){
  const search=req.body
  try{
    const users=await User.findAll({
      where:{
        [Op.and]: [
          {'username':{[Op.substring]:search.username}},
          {'phone':{[Op.substring]: search.phone}},
          {'username':{[Op.notLike]:"Admin"}},
        ] 
      }
    })
    console.log(users)
    res.render('account/accountAdmin',{title:'accountAdmin',users:users,search:search})
  }catch(error){
    next(error)
}
})
router.get('/account/:id',async function(req,res,next){
  try{
    id=req.params.id;
    const user=await User.findOne({raw:true, where: { id:id }})
    res.render('account/accountDetailAdmin',{title:'accountDetail',user})
  }catch(error){
    next(error)
  }
})
router.post('/account/:id/username',async function(req,res,next){
  try{
    const id=req.params.id;
    await User.update({username:req.body.username},
      {where:{id:id}}
      )
    res.redirect(`/admin/account/${id}`);
  }catch(error){
       next(error)
  }
})
router.post('/account/:id/dateOfBirth',async function(req,res,next){
  try{
    const id=req.params.id;
    // res.json(req.body.dateOfBirth)
    await User.update({dateOfBirth:req.body.dateOfBirth},
      {where:{id:id}}
      )
      res.redirect(`/admin/account/${id}`);
    }catch(error){
       next(error)
  }
})
router.post('/account/:id/phone',async function(req,res,next){
  try{
    const id=req.params.id;
    await User.update({phone:req.body.phone},
      {where:{id:id}}
      )
      res.redirect(`/admin/account/${id}`);
    }catch(error){
       next(error)
  }
})
router.post('/account/:id/remove',async function(req,res,next){
  try{
    const id=req.params.id;
    await User.destroy({
      include:[{model:Reservation}],
      where:{id:id}
    })
    res.redirect('/admin/account');
  }catch(error){
       next(error)
  }
})
module.exports = router;

