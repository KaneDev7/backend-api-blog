const {  DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');


 const ArticleModel = sequelize.define('articles', {
  // Model attributes are defined here
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  url : {
    type : DataTypes.STRING,
    allowNull : false
  }
}, {
  // Other model options go here
});

sequelize.sync().then(() => {
    console.log('Articles table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
module.exports ={
    ArticleModel
}