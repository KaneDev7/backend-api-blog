"use client"
import React, { useEffect, useState } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { Oswald } from "next/font/google";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { PiBellSimpleRinging } from "react-icons/pi";
import { postComment, getComments, addLike, postResponseToComment, addLikeToResponseComment, deleteComment, deleteResponseToComment } from '../../../../lib/comments'
import { useSelector } from 'react-redux';
import { convertISOToDuration } from '../../../../utils';
import ResponseToComment from './responseToComment'
import CommentModal from './commentModal'
import { useParams } from 'next/navigation';
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const inter = Oswald({ subsets: ["latin"] });



export default function Comments({ commentLength }) {
    const auth = useSelector(state => state.auth)
    const [comments, setComments] = useState([])
    const [content, setContent] = useState('')
    const [modalContent, setModalContent] = useState('')
    const [editContentId, setEditContentId] = useState('')
    const [parentCommentId, setParentCommentId] = useState(null)
    const [showResposesId, setShowResposesId] = useState([])
    const [showEditModal, setShowEditModal] = useState(false)
    const [isEditResponseToComment, setIsEditResponseToComment] = useState(false)

    const { id: articleId } = useParams()


    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!auth) return alert('Connectez-vous d\'abord')
        if (content?.trim() === '') return

        const formData = new FormData()
        formData.append('content', content)
        formData.append('parent_comment_id', null)
        formData.append('userId', auth?.id)
        formData.append('articleId', articleId)
        await postComment(formData)
        const data = await getComments(articleId)
        setComments(data)
        setContent('')
        setParentCommentId(null)
    }


    const handleAddLike = async (cmtId) => {
        if (!auth) return alert('Connectez-vous d\'abord')
        await addLike(auth?.id, cmtId)
        const data = await getComments(articleId)
        setComments(data)
    }


    const handleAddLikeToRespose = async (responseId) => {
        await addLikeToResponseComment(auth?.id, responseId)
        const data = await getComments(articleId)
        setComments(data)
    }

    const handleShowResponseToComment = (commentId) => {
        if (!showResposesId.includes(commentId)) {
            return setShowResposesId(v => [...v, commentId])
        }

        setShowResposesId(showResposesId.filter(item => item !== commentId))
    }

    const handleDelete = async (commentId) => {
        const confirm = window.confirm('Voulez-vous vraiment supprimer cet commentaire ?')
        if (!confirm) return
        await deleteComment(commentId)
        const data = await getComments(articleId)
        setComments(data)
    }

    const handleEdit = (id, text) => {
        setIsEditResponseToComment(false)
        setShowEditModal(true)
        setModalContent(text)
        setEditContentId(id)
    }

    const handleResponseToComment = (commentId) => {
        if (!auth) return alert('Connectez-vous d\'abord')
        setShowEditModal(true)
        setParentCommentId(commentId)
        setShowResposesId(v => [...v, commentId])
        setModalContent('')
    }

    const onDeleteResponseToComment = async (commentId) => {
        deleteResponseToComment
        const confirm = window.confirm('Voulez-vous vraiment supprimer cet commentaire ?')
        if (!confirm) return
        await deleteResponseToComment(commentId)
        const data = await getComments(articleId)
        setComments(data)
    }

    useEffect(() => {
        const fetcheData = async () => {
            const data = await getComments(articleId)
            let responseLength = 0
            for (const comment of data) {
                responseLength += comment.responseToComments.length
            }
            setComments(data)
        }
        fetcheData()
    }, [articleId])



    return (
        <div className='mt-40 py-10 border-t'>
            {showEditModal &&
                <CommentModal
                    setShowEditModal={setShowEditModal}
                    setModalContent={setModalContent}
                    setComments={setComments}
                    setParentCommentId={setParentCommentId}
                    modalContent={modalContent}
                    editContentId={editContentId}
                    isEditResponseToComment={isEditResponseToComment}
                    parentCommentId={parentCommentId}
                />}
            <h1 className={`${inter.className} text-2xl font-bold text-black/75 `}>{commentLength} Commentaire{commentLength > 1 && 's'}  </h1>
            {
                comments?.map(comment => (
                    <div key={comment.id} className='mt-20'>
                        <header className={`flex gap-5 items-center py-3 border-b`} >
                            <FaCircleUser size={45} color='#9d9d9df1' />    
                            <div>
                                <h2 className='font-bold text-[18px] text-black/80 '> {comment?.user?.username} </h2>
                                <span className='text-black/60 font-medium text-[13px] '> {convertISOToDuration(comment.createdAt)} </span>
                            </div>
                        </header>
                        <main className='py-5'>
                            <p className='text-sm leading-6'> {comment.content} </p>
                        </main>

                        <footer className='flex justify-between items-center py-5 mt-4 border-t'>
                            <div className='flex items-center gap-3 cursor-pointer' >
                                <span
                                    onClick={() => handleResponseToComment(comment.id)}
                                    className={`${inter.className} rounded-full px-2 py-[2px] font-bold  bg-black/60 text-[10px] text-white`} > REPONDRE </span>
                                <p className='flex items-center gap-1'>
                                    {
                                        JSON.parse(comment?.likes).includes(auth?.id.toString()) ?
                                            <AiFillLike onClick={() => handleAddLike(comment?.id)} size={20} color='green' /> :
                                            <AiOutlineLike onClick={() => handleAddLike(comment?.id)} size={20} color='#7c7c7c' />
                                    }
                                    <span className='text-[13px] text-[#7c7c7c] '> + {JSON.parse(comment?.likes).length} </span>
                                </p>
                            </div>

                            <div className='flex justify-between gap-3'>
                                <p
                                    onClick={() => handleShowResponseToComment(comment.id)}
                                    className='hover:underline text-sm cursor-pointer '>
                                    {comment?.responseToComments?.length} réponse{comment?.responseToComments?.length > 1 && 's'}
                                </p>
                                <div className={`${inter.className} flex items-center gap-2 cursor-pointer text-sm text-red-600 `} >
                                    <PiBellSimpleRinging size={17} />
                                    <p>Signaler</p>
                                </div>
                                {
                                    auth && auth.username === comment?.user?.username &&
                                    <div className='flex items-center gap-3'>
                                        <MdModeEdit onClick={() => handleEdit(comment.id, comment.content)} color='#3d3d3e' size={20} />
                                        <MdDelete onClick={() => handleDelete(comment.id)} color='#fa7575' size={20} />
                                    </div>
                                }
                            </div>

                        </footer>

                        {
                            showResposesId.includes(comment.id) &&
                            comment?.responseToComments.map(response => (
                                <ResponseToComment
                                    comment={response}
                                    onDeleteResponseToComment={onDeleteResponseToComment}
                                    handleAddLikeToRespose={handleAddLikeToRespose}
                                    setIsEditResponseToComment={setIsEditResponseToComment}
                                    setShowEditModal={setShowEditModal}
                                    setModalContent={setModalContent}
                                    setEditContentId={setEditContentId}
                                />
                            ))
                        }

                    </div>
                ))
            }

            {/* texterea */}
                <div className='mt-10'>
                    <form onSubmit={handleSubmit} action="">
                        <div className='flex flex-col'>
                            <label htmlFor="comment">Commentaires:</label>
                            <textarea
                                onChange={(e) => setContent(e.target.value)}
                                value={content} id='comment' className='h-[200px] p-3 text-sm mt-4 outline-none border-2 resize-none' ></textarea>
                        </div>
                        <button className='h-[50px] w-1/2 opacity-90 hover:opacity-100 bg-black text-white rounded-md mt-4' type='submit'>Poster</button>
                    </form>
                </div>        
        </div>
    )
}
