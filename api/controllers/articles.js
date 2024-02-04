const { ArticleModel } = require('../models/articles')


const getArticles = async (req, res) => {
    try {
        const users = await ArticleModel.findAll();
        res.status(200).send(users)
    } catch (error) {
        console.log(error)
    }
}

const getArticle =  async (req, res) => {
    const { id } = req.params
    try {
        const article = await ArticleModel.findOne({ where: { id: id.toString()} });
        if (!article) return res.status(200).send({ message: 'article non trouvé' })
        res.status(200).send(article)
    } catch (error) {
        console.log(error)
    }
}

const postArticle =  async (req, res) => {
    const {category, title, body, url } = req.body
    if (!title || !body || !category)  {
        res.status(400).send({ message: 'données incorectes' })
    } 
    try {
        await ArticleModel.create({category, title, body, url })
        res.status(200).send(JSON.stringify({ message: 'article crée' }))
    } catch (error) {
        console.log(error)
    }
}

const deleteArticle =  async (req, res) => {
    const { id } = req.params
    try {
        await ArticleModel.destroy({ where: { id: id.toString() } });
        const articles = await ArticleModel.findAll();
        res.status(200).send({ message: `article avec id ${id} supprimée avec succée`, articles })
    } catch (error) {
        console.log(error)
    }
}

const editArticle = async (req, res) => {
    const { id } = req.params
    try {
       
        
        const article = await ArticleModel.findOne({ where: { id: id.toString() } });
        res.status(200).send({ message: `article avec id ${id} moddifier avec succée`, article })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getArticles,
    getArticle,
    postArticle,
    deleteArticle,
    editArticle
    
}