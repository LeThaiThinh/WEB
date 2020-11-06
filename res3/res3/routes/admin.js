var express = require('express');
var router = express.Router();
const Dish=require("../model/dish")
const BookingTable=require("../model/bookingTable")
/*ADMIN*/
// home
router.get('/',function(req,res,next){
    res.render('home/homeAdmin',  {title: 'homeAdmin'});
});
//menu
router.get('/menu',async function(req,res,next){
    const dishes=await Dish.findAll({raw:true});
    res.render('menu/menuAdmin',  {title: 'menuAdmin',dishes});
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
router.get('/menu/:id',async function(req,res,next){
    const dishId=req.params.id;
    const dish=await Dish.findOne({where:{id:dishId}});
    res.render('menu/dishDetailAdmin',  {title: 'menu',dish});
});
router.post('/menu/:id/remove',async function(req,res,next){
    const dishId=req.params.id;
    await Dish.destroy({where:{id:dishId}})
    res.redirect('/admin/menu')
});
router.get('/menu/:id/edit',async function(req,res,next){
    const dishes=await Dish.findAll({raw:true});
    res.render('menu/edit',  {title: 'edit',dishes});
});
router.post('/menu/:id/edit',async function(req,res,next){
    try{
        const dish=req.body;
        const dishId=req.params.id;
        await Dish.update(dish,
          {where:{id:dishId}}
          )
        res.redirect('/menu');
    }catch(error){
           next(error)
    }
});
module.exports = router;