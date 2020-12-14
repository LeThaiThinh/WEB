const Sequelize = require('sequelize');
const pathSql = 'mysql://root:Root@localhost:3306/new_schema';
const sequelize = new Sequelize(pathSql, { 
  logging: false,
  define: {
      timestamps: false
  }
});
const RatingDish=sequelize.define('ratingDish',{
    rating:{
        type:Sequelize.INTEGER,
    },
})
module.exports={RatingDish:RatingDish,sequelize:sequelize};