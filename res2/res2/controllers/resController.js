const Dish=require("../models/dish")
// const cloudinary=require("cloudinary");
// const multer =require('multer')
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_API_SECRET
// })
// const storage =multer.diskStorage({});
// const upload = multer({storage});
// exports.upload= upload.single('image');
// exports.pushToCloudinary =(req,res,next)=>{
//     if(req.file){
//         cloudinary.uploader.upload(req.file.path)
//         .then((result)=>{
//             req.body.image=result.public_id;
//             next();
//         })
//         .catch(()=>{
//             res.redirect('/admin/add');
//         })
//     } else {
//         next();
//     }
// }
// exports.homePage =(req,res)=>{
//     res.render('index', { title: 'Express' });
// }
exports.listAllDishes = async (req,res,next)=>{
    try{
    const allDishes= await Dish.find();
    res.render('menu',{title: 'menu',allDishes});
    //res.json(allDishes);
    }catch(errors){
        next(next);
    }
}
exports.homePageFilter=async (req,res,next)=>{
    try{
        console.log(process.env.DB)
        const dishes=await Dish.aggregate([
        {$match:{available:true}},
        {$sample:{size:9}}
    ]);
    const countries= Dish.aggregate([
        {$group:{_id:'$country'}},
        {$sample:{size:9}}
    ]);
    const [filteredCountries,filteredDishes]= await Promise.all([countries,dishes])
    res.render('index',{filteredCountries,filteredDishes});
    }catch(error){
        next(error)
    }
}
exports.adminPage=(req,res) =>{
    res.render('admin', {title:'Admin'});
}
exports.createDishGet=(req,res)=>{
    res.render('addDish', {title:'Add new Dish'})
}
exports.createDishPost=async (req,res,next)=>{
    try{
    const dish=new Dish(req.body)
    await dish.save();
    res.redirect(`/menu/${dish._id}`);
    }catch(error){
        next(error)
    }
}
exports.editGet =(req,res)=>{
    res.render('editDish',{title: 'Search for Dish to edit or edit'})
}
exports.editPost =async(req,res,next)=>{
    try{
       const dishId=req.body.dishId||null;
       const dishName=req.body.dishName||null;
       const dishData= await Dish.find({$or:[
           {_id:dishId},
           {name:dishName}
       ]}).collation({
           locale:'en',
           strength: 2,
       });
       if(dishData.length>0){
           res.render('dishDetail',{title:'dishDetail',dishData})
           return
       }else{
           res.redirect('admin/editDish');
       }
        }catch(errors){
        next(next)
    }
}
exports.updateGet=async(req,res,next)=>{
    try{
        const dishId=req.params.dishId;
        const dish=await Dish.findOne({ _id:dishId})
        res.render('addDish',{title:'Update Dish',dish})
    }catch(errors){
        next(errors)
    }
}
exports.updatePost=async(req,res,next)=>{
    try{
        const dishId=req.params.dishId;
        const dish= await Dish.findByIdAndUpdate(dishId,req.body,{new:true});
        res.redirect(`/menu`)
    }catch(error){
        next(error)
    }

}

exports.deleteGet=async(req,res,next) =>{
    const dishId=req.params.dishId;
    const dish=await Dish.findOne({_id: dishId});
    res.render('addDish',{title:'Delete dish', dish})
}
exports.deletePost=async(req,res,next) =>{
    try{
        const dishId=req.params.dishId;
        const dish= await Dish.findByIdAndRemove({_id:dishId});
        res.redirect(`/menu`)
    }catch(error){
        next(error)
    }
}

exports.dishDetail=async(req,res,next)=>{
    try{
        const dishId=req.params.dishId;
        const dishData= await Dish.find({_id: dishId});
        res.render('dishDetail',{title:'Detail',dishData});
    }catch(error){
        next(error)
    }
}
exports.searchResults=async(req,res,next)=>{
    try{
        const searchQuery=req.body;
        const parsedStars=parseInt();
        const parsedSort
        const searchData=await Dish.aggregate([
            {$match:{$text:{$search:`\"${searchQuery.destination}"`}}},
            {$match:{available:true,starRating:{$gte:searchQuery.stars}}},
            {$sort:{cost_per_night:searchQuery.sort}}
        ])
        // res.json(searchData);
        
    }catch(error){
        next(error)
    }
}