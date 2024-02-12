 const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');


 const UsersModel = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  jwt: {
    type: DataTypes.STRING,
  },

  // article_id:{
  //   type : DataTypes.INTEGER,
  //   references :{
  //     model : ArticleModel,
  //     key: 'id'
  //   }
  // }

});

sequelize.sync().then(() => {
    console.log('Users table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
 
module.exports = { UsersModel}