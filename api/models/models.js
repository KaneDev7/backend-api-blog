const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

// users model
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

// aricels model
const ArticleModel = sequelize.define('articles', {
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


const CategoryModel = sequelize.define('categories', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

});


UsersModel.hasMany(ArticleModel)
CategoryModel.hasMany(ArticleModel)
ArticleModel.belongsTo(CategoryModel)
ArticleModel.belongsTo(UsersModel)



sequelize.sync().then(() => {
    console.log('tables created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});



module.exports = {
    ArticleModel,
    CategoryModel,
    UsersModel
}
