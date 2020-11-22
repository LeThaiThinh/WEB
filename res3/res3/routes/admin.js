var express = require('express');
var router = express.Router();
const Dish=require("../model/dish")
const BookingTable=require("../model/bookingTable")
const user=require("../model/user")
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
router.get('/menu/:dishId',async function(req,res,next){
    const dishId=req.params.dishId;
    const dish=await Dish.findOne({where:{dishId:dishId}});
    res.render('menu/dishDetailAdmin',  {title: 'menu',dish});
});
router.post('/menu/:dishId/remove',async function(req,res,next){
    const dishId=req.params.dishId;
    await Dish.destroy({where:{dishId:dishId}})
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
          {where:{dishId:dishId}}
          )
        res.redirect('/admin/menu');
    }catch(error){
           next(error)
    }
});
//booking
router.get('/booking',async function(req,res,next){
    const tables= await Table.findAll({raw:true})
    res.render('booking/bookingAdmin', {title:'booking',tables})
})
router.post('/booking/editTable',async function(req,res,next){
    try{
        const tableId=req.body.numberTable;
        tables =await Table.create({
            numberTable: tableId,
            occuppied: false
        })
    }catch(error){
           next(error)
    }
    res.render('booking/editTable', {title:'booking',tables})
})
router.get('/booking/editTable',async function(req,res,next){
    const tables= await Table.findAll({raw:true})
    res.render('booking/editTable', {title:'booking',tables})
})
module.exports = router;

