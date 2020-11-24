var express = require('express');
var router = express.Router();
const Op = require('sequelize').Op;
const Dish=require("../model/dish")
const ReserveTable=require("../model/reserveTable")
const User=require("../model/user")
const Table=require("../model/table")
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
    const dishes=await Dish.findAll({raw:true});
    res.render('menu/menuAdmin',  {title: 'menuAdmin',dishes});
    }catch(error){
        next(error);
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
router.get('/menu/:id',async function(req,res,next){
    const id=req.params.id;
    const dish=await Dish.findOne({where:{id:id}});
    res.render('menu/dishDetailAdmin',  {title: 'menu',dish});
});
router.post('/menu/:id/remove',async function(req,res,next){
    const id=req.params.id;
    await Dish.destroy({where:{id:id}})
    res.redirect('/admin/menu')
});
router.get('/menu/:id/edit',async function(req,res,next){
    const dishes=await Dish.findAll({raw:true});
    res.render('menu/edit',  {title: 'edit',dishes});
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
    const tables= await Table.findAll({raw:true})
    res.render('reserve/reserveAdmin', {title:'reserve',tables})
})
router.post('/reserve/editTable',async function(req,res,next){
    try{
        const tableId=req.body.numberTable;
        tables =await Table.create({
            numberTable: tableId,
            occuppied: false
        })
    }catch(error){
           next(error)
    }
    res.render('reserve/editTable', {title:'reserve',tables})
})
router.get('/reserve/editTable',async function(req,res,next){
    const tables= await Table.findAll({raw:true})
    res.render('reserve/editTable', {title:'reserve',tables})
})
//account
router.get('/account',async function(req,res,next){
    const users=await User.findAll({raw:true})
    res.render('account/accountAdmin',{title:'accountAdmin',users})
})
router.post('/:id/username',async function(req,res,next){
  try{
    const id=req.params.id;
    await User.update(username,
      {where:{id:id}}
      )
    res.redirect('/admin/account');
  }catch(error){
       next(error)
  }
})
router.post('/:id/remove',async function(req,res,next){
  try{
    const id=req.params.id;
    await User.destroy({where:{id:id}})
    res.redirect('/admin/account');
  }catch(error){
       next(error)
  }
})
module.exports = router;

