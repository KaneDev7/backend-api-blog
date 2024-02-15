const { CommentModel, UsersModel } = require('../models/models')


const getComments = async (req, res) => {
    const {articleId} = req.query

    console.log('articleId', req.query)
    
    try {
        const comments = await CommentModel.findAll({
            where: { articleId },
            include: UsersModel
        });
        if (!comments) return res.status(200).send({ message: 'commentaire non trouvé' })
       console.log('comments touveé')
        res.status(200).send(comments)
    } catch (error) {
        console.log(error)
    }
}



const postComment = async (req, res) => {
    console.log('comment', req.body)
    const { content, parent_comment_id, userId, articleId } = req.body

    if (!content || !userId || !articleId) {
        return res.status(400).send({ message: 'données incorectes' })
    }
    try {
        await CommentModel.create({ content, parent_comment_id, userId, articleId })
        res.status(200).send(JSON.stringify({ message: 'comment posté' }))
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getComments,
    postComment
}