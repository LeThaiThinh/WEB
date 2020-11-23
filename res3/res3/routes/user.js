var express = require('express');
var router = express.Router();
const Dish=require("../model/dish")
/* GET userlisting. */
router.get('/', function(req, res, next) {
  req.session.value="qwer";
  res.render('home/homeUser', { title: 'homeUser' });
});
// menu
router.get('/menu',async function(req,res,next){
  try{
    const dishes= await Dish.findAll({raw:true})
    res.render('menu/menuUser',  {title: 'menu', dishes:dishes});
  }catch(error){
    next(error)
  }
});
router.get('/menu/:id',async function(req,res,next){
  const id=req.params.id;
  const dish=await Dish.findOne({where:{id:id}});
  res.render('menu/dishDetail',  {title: 'menu',dish:dish});
});
//booking
router.get('/booking',async function(req,res,next){
  const tables= await Table.findAll({raw:true})
  res.render('booking/booking', {title:'booking',tables})
})

module.exports = router;
