const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

// aricels model
const ArticleModel = sequelize.define('Articles', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


sequelize.sync().then(() => {
    console.log('Articles table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = {
    ArticleModel,
}
