const url = require('url')
const { ArticleModel, CategoryModel, UsersModel, CommentModel } = require('../models/models');
const { deleteImg } = require('./files');
const { Op } = require('sequelize');
const { link } = require('fs');


const getArticles = async (req, res) => {

    const { categoryId, userId, key } = req.query
    console.log('query', req.query)
    try {
        if (userId) {
            const article = await ArticleModel.findAll({
                where: { userId }
            });
            if (!article) return res.status(204).send({ message: 'article non trouvé' })
            return res.status(200).send(article)
        }

        if (categoryId && categoryId !== '1') {
            const article = await ArticleModel.findAll({
                where: { categoryId }
            });
            if (!article) return res.status(204).send({ message: 'article non trouvé' })
            return res.status(200).send(article)
        }

        if (key) {
            const searchArticleResult = await ArticleModel.findAll({
                where: {
                    title: {
                        [Op.substring]: `%${key}%`
                    }
                }
            })
            if (!searchArticleResult) return res.status(204).send({ message: `accune article ne corresponde au mot clé` })
            return res.status(200).send(searchArticleResult)
        }
        const articles = await ArticleModel.findAll();
        res.status(200).send(articles)
    } catch (error) {
        console.log(error)
    }
}

const getArticle = async (req, res) => {
    const { id } = req.params
    try {
        const article = await ArticleModel.findOne({
            where: { id: id.toString() },
            include: [CategoryModel, UsersModel]
        });
        if (!article) return res.status(200).send({ message: 'article non trouvé' })
        res.status(200).send(article)
    } catch (error) {
        console.log(error)
    }
}



const postArticle = async (req, res) => {
    const { title, body, url, userId, categoryId } = req.body
    if (!title || !body || !url, !userId, !categoryId) {
        return res.status(400).send({ message: 'données incorectes' })
    }
    try {
        await ArticleModel.create({ title, body, url, userId, categoryId })
        res.status(200).send(JSON.stringify({ message: 'article crée' }))
    } catch (error) {
        console.log(error)
    }
}

const deleteArticle = async (req, res) => {
    const { id } = req.params
    const { userId, imgName } = req.query
    try {
        await ArticleModel.destroy({ where: { id: id.toString() } });
        deleteImg(imgName)
        const articles = await ArticleModel.findAll({ where: { userId } });
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
    editArticle,
}