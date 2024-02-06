const express = require('express')
const path = require('path')
const multer  = require('multer')
const { upload } = require('../middleweres/upload')
const { getArticles, getArticle, postArticle, deleteArticle, editArticle } = require('../controllers/articles')
const { register, login } = require('../controllers/users')
const { authVerification } = require('../middleweres/auth')
const route = express.Router()
const app = express()


// artciles routes
route.get('/articles', getArticles)
route.get('/article/:id',getArticle)
route.post('/article',authVerification, postArticle)
route.delete('/article/:id',authVerification,deleteArticle)
route.put('/article/:id',authVerification, editArticle)

// users routes
route.post('/auth/register', register)
route.post('/auth/login', login)


// files routes
route.post('/api/image', upload.single('image'), async (req, res) => {
    res.status(200).json({message: 'image telechargé avec succée'})
})

module.exports = {
    route
}
