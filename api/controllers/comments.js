const { CommentModel, UsersModel ,ResponseToCommentModel} = require('../models/models')


const getComments = async (req, res) => {
    const {articleId} = req.query    
    try {
        const comments = await CommentModel.findAll({
            where: { articleId },
            include: [UsersModel,ResponseToCommentModel],
            
        });
        if (!comments) return res.status(200).send({ message: 'commentaire non trouvé' })
       console.log('comments touveé')
        res.status(200).send(comments)
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
        await CommentModel.create({ content, parent_comment_id : Number(parent_comment_id[1]), userId, articleId })
        res.status(200).send(JSON.stringify({ message: 'comment posté' }))
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

const addLikeToResponseComment = async (req, res) => {
    const { responseId } = req.params
    const {userId} = req.query    

    if (!responseId || !userId ) {
        return res.status(400).send({ message: 'données incorectes' })
    }
    try {
        const comment = await ResponseToCommentModel.findOne({where : {id : responseId}})

        const likesParsed = JSON.parse(comment.likes)
        if(!likesParsed.includes(userId)){
            likesParsed.push(userId)
        }else{
            const index = likesParsed.findIndex(item => item === userId)
            likesParsed.splice(index,1)
        }
        await ResponseToCommentModel.update({likes : JSON.stringify(likesParsed) },{
            where : {id : responseId}
        })
        res.status(200).send(JSON.stringify({ message: 'like mis à jour' }))
    } catch (error) {
        console.log(error)
    }
}

const addLike = async (req, res) => {
    const { commentId } = req.params
    const {userId} = req.query    

    if (!commentId || !userId ) {
        return res.status(400).send({ message: 'données incorectes' })
    }
    try {
        const comment = await CommentModel.findOne({where : {id : commentId}})

        const likesParsed = JSON.parse(comment.likes)
        if(!likesParsed.includes(userId)){
            likesParsed.push(userId)
        }else{
            const index = likesParsed.findIndex(item => item === userId)
            likesParsed.splice(index,1)
        }
        await CommentModel.update({likes : JSON.stringify(likesParsed) },{
            where : {id : commentId}
        })
        res.status(200).send(JSON.stringify({ message: 'like mis à jour' }))
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getComments,
    postComment,
    postResponseToComment,
    addLike,
    addLikeToResponseComment
}