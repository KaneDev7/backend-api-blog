const { Sequelize } = require('sequelize');
require('dotenv').config()


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, '', {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  })

 const testConnection = async () =>{
    console.log(
        'host', process.env.DB_HOST,
    )
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
 } 

 module.exports={
    testConnection,
    sequelize
 }