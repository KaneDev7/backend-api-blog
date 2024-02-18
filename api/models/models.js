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




// category model
const CategoryModel = sequelize.define('categories', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

});


// comments model
const CommentModel = sequelize.define('comments', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    parent_comment_id: {
        type: DataTypes.INTEGER,
    },
    likes: {
        type: DataTypes.STRING,
        defaultValue: '[]'
    }
});

// ResponseToComment model
const ResponseToCommentModel = sequelize.define('responseToComment', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    likes: {
        type: DataTypes.STRING,
        defaultValue: '[]'
    },
    username : {
        type: DataTypes.STRING,
    }
});


UsersModel.hasMany(ArticleModel)
UsersModel.hasMany(CommentModel)
CategoryModel.hasMany(ArticleModel)
ArticleModel.hasMany(CommentModel)
CommentModel.hasMany(ResponseToCommentModel)


ArticleModel.belongsTo(UsersModel)
CommentModel.belongsTo(UsersModel)
ArticleModel.belongsTo(CategoryModel)
CommentModel.belongsTo(ArticleModel)
ResponseToCommentModel.belongsTo(CommentModel)



sequelize.sync().then(() => {
    console.log('tables created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});



module.exports = {
    ArticleModel,
    CategoryModel,
    UsersModel,
    CommentModel,
    ResponseToCommentModel
}
