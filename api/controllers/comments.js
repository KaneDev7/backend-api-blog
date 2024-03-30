const { CommentModel, UsersModel, ResponseToCommentModel } = require('../models/models')


const getComments = async (req, res) => {
    const { articleId } = req.query
    try {
        const comments = await CommentModel.findAll({
            where: { articleId },
            include: [{
                model: UsersModel,
                attributes: ['username'],
            }, ResponseToCommentModel],
        });
        if (!comments) return res.status(200).send({ message: 'commentaire non trouvé' })
        res.status(200).send(comments)
    } catch (error) {
        console.log(error)
    }
}

const getComment = async (req, res) => {
    const { id } = req.params
    console.log('id', id)
    try {
        const comment = await CommentModel.findOne({
            where: { id },
            include: [{
                model: UsersModel,
                attributes: ['username'],
            }],
        });
        if (!comment) return res.status(200).send({ message: 'commentaire non trouvé' })
        res.status(200).send(comment)
    } catch (error) {
        console.log(error)
    }
}

const postComment = async (req, res) => {
    const { content, parent_comment_id, userId, articleId } = req.body

    console.log('response', req.body)

    if (!content || !userId || !articleId) {
        return res.status(400).send({ message: 'données incorectes' })
    }
    try {
        await CommentModel.create({ content, parent_comment_id: Number(parent_comment_id[1]), userId, articleId })
        res.status(200).send(JSON.stringify({ message: 'comment posté' }))
    } catch (error) {
        console.log(error)
    }
}

const editComment = async (req, res) => {
    const { id } = req.params
    const { content } = req.body
    console.log('content', content)
    if (!content) {
        return res.status(400).send({ message: 'données incorectes' })
    }
    try {
        const article = await CommentModel.update({ content }, {
            where: { id: id.toString() }
        });
        res.status(200).send({ message: `article avec id ${id} moddifier avec succée`, article })
    } catch (error) {
        console.log(error)
    }
}


const deleteComment = async (req, res) => {
    const { id } = req.params
    try {
        await
            CommentModel.destroy({ where: { id: id.toString() } });
        res.status(200).send({ message: `comment avec id ${id} supprimée avec succée` })
    } catch (error) {
        console.log(error)
    }
}


const deleteResponseToComment = async (req, res) => {
    const { id } = req.params
    try {
        await ResponseToCommentModel.destroy({ where: { id: id.toString() } });
        res.status(200).send({ message: `comment avec id ${id} supprimée avec succée` })
    } catch (error) {
        console.log(error)
    }
}

const postResponseToComment = async (req, res) => {
    const { content, username, commentId } = req.body

    if (!content || !username || !commentId) {
        return res.status(400).send({ message: 'données incorectes' })
    }
    try {
        await ResponseToCommentModel.create({ content, username, commentId })
        res.status(200).send(JSON.stringify({ message: 'comment posté' }))
    } catch (error) {
        console.log(error)
    }
}

const editResponseToComment = async (req, res) => {
    const { id } = req.params
    const { content } = req.body
    if (!content) {
        return res.status(400).send({ message: 'données incorectes' })
    }
    try {
        const article = await ResponseToCommentModel.update({ content }, {
            where: { id: id.toString() }
        });
        res.status(200).send({ message: `article avec id ${id} moddifier avec succée`, article })
    } catch (error) {
        console.log(error)
    }
}

const addLikeToResponseComment = async (req, res) => {
    const { responseId } = req.params
    const { userId } = req.query

    if (!responseId || !userId) {
        return res.status(400).send({ message: 'données incorectes' })
    }
    try {
        const comment = await ResponseToCommentModel.findOne({ where: { id: responseId } })

        const likesParsed = JSON.parse(comment.likes)
        if (!likesParsed.includes(userId)) {
            likesParsed.push(userId)
        } else {
            const index = likesParsed.findIndex(item => item === userId)
            likesParsed.splice(index, 1)
        }
        await ResponseToCommentModel.update({ likes: JSON.stringify(likesParsed) }, {
            where: { id: responseId }
        })
        res.status(200).send(JSON.stringify({ message: 'like mis à jour' }))
    } catch (error) {
        console.log(error)
    }
}

const addLike = async (req, res) => {
    const { commentId } = req.params
    const { userId } = req.query

    if (!commentId || !userId) {
        return res.status(400).send({ message: 'données incorectes' })
    }
    try {
        const comment = await CommentModel.findOne({ where: { id: commentId } })

        const likesData = [...comment.likes]

        if (!likesData.includes(userId)) {
            likesData.push(userId)
        } else {
            const index = likesData.findIndex(item => item === userId)
            likesData.splice(index, 1)
        }

        await CommentModel.update({ likes: JSON.stringify(likesData) }, {
            where: { id: commentId }
        })
        res.status(200).send(JSON.stringify({ message: 'like mis à jour' }))
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getComments,
    getComment,
    postComment,
    editComment,
    deleteComment,
    deleteResponseToComment,
    postResponseToComment,
    addLike,
    addLikeToResponseComment,
    editResponseToComment
}