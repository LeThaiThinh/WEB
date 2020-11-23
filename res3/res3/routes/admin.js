var express = require('express');
var router = express.Router();
const Dish=require("../model/dish")
const reserveTable=require("../model/reserveTable")
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
module.exports = router;

