const express = require('express')
const path = require('path')
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
const {
    getComments,
    postComment,
    addLike,
    postResponseToComment,
    addLikeToResponseComment,
    deleteComment,
    deleteResponseToComment,
    editComment,
    editResponseToComment,
    getComment
} = require('../controllers/comments')

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
route.get('/comments/:id', getComment)
route.post('/comments', postComment)
route.put('/comments/:id', editComment)
route.delete('/comments/:id', deleteComment)
route.post('/comments/response', postResponseToComment)
route.patch('/comments/likes/:commentId', addLike)

route.put('/comments/response/:id', editResponseToComment)
route.delete('/comments/response/:id', deleteResponseToComment)
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
