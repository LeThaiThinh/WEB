var express = require('express');
var router = express.Router();

const res=require('../controllers/resController');

/* GET home page. */
router.get('/', res.homePageFilter);
router.get('/menu',res.listAllDishes);
router.get('/menu/:dishId',res.dishDetail);
router.post('/results',res.searchResults);

router.get('/admin',res.adminPage);
router.get('/admin/add',res.createDishGet);
router.post('/admin/add',
    // res.upload,
    // res.pushToCloudinary,
    res.createDishPost);
router.get('/admin/edit',res.editGet);
router.post('/admin/edit',res.editPost);
router.get('/admin/:dishId/update',res.updateGet);
router.post('/admin/:dishId/update',res.updatePost);
router.get('/admin/:dishId/delete',res.deleteGet);
router.post('/admin/:dishId/delete',res.deletePost);
module.exports = router; 