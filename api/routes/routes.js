const express = require('express')
const path = require('path')
const multer = require('multer')
const { upload } = require('../middleweres/upload')
const {
    getArticles,
    getArticle,
    postArticle,
    deleteArticle,
    editArticle
} = require('../controllers/articles')

const { register, login } = require('../controllers/users')
const { authVerification } = require('../middleweres/auth')
const { getCategory } = require('../controllers/categories')
const { getComments, postComment, addLike, postResponseToComment, addLikeToResponseComment } = require('../controllers/comments')
const route = express.Router()
const app = express()


// artciles routes
route.get('/articles', getArticles)
route.get('/article/:id', getArticle)
route.post('/article', postArticle)
route.delete('/article/:id', deleteArticle)
route.put('/article/:id', editArticle)

// category routes
route.get('/categories', getCategory)

// comments routes
route.get('/comments', getComments)
route.post('/comments', postComment)
route.post('/comment/response', postResponseToComment)
route.patch('/comments/likes/:commentId', addLike)
route.patch('/comments/response/likes/:responseId', addLikeToResponseComment)




// auth routes
route.post('/auth/register', register)
route.post('/auth/login', login)


// verify token
route.get('/auth/checkToken', authVerification, (req, res) => {
    const { username, token } = req.auth
    res.status(200).json({ username, token })
})


// files routes
route.post('/api/image', upload.single('image'), async (req, res) => {
    res.status(200).json({ message: 'image telechargé avec succée' })
})

module.exports = {
    route
}
