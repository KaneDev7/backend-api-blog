const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');


const CategoryModel = sequelize.define('Categories', {

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

});

console.log('category file')

sequelize.sync().then(() => {
  console.log('categories table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});


module.exports = {
  CategoryModel
}



