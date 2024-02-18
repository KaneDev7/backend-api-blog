"use client"
import React, { useEffect, useState } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { Oswald } from "next/font/google";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { PiBellSimpleRinging } from "react-icons/pi";
import { postComment, getComments, addLike, postResponseToComment, addLikeToResponseComment } from '../../../lib/comments'
import { useSelector } from 'react-redux';
import { convertISOToDuration } from '../../../utils';
import ResponseToComment from './responseToComment'
import { useParams } from 'next/navigation';
import { button } from '@nextui-org/react';

const inter = Oswald({ subsets: ["latin"] });



export default function Comments() {
    const auth = useSelector(state => state.auth)
    const [comments, setComments] = useState([])
    const [commentLength, setCommentLength] = useState(0)
    const [content, setContent] = useState('')
    const [contentResponse, setContentResponse] = useState('')
    const [parentCommentId, setParentCommentId] = useState(null)
    const [showResposesId, setShowResposesId] = useState([])

    const { id: articleId } = useParams()



    console.log('commentLength', commentLength)
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!parentCommentId && content?.trim() === '') return
        if (parentCommentId && contentResponse?.trim() === '') return

        if (!auth) return alert('Veuillez vous connecter pour pouvoir poster un commentaire')
        const text = content || contentResponse
        const formData = new FormData()
        formData.append('content', text)
        formData.append('parent_comment_id', null)
        parentCommentId  &&  formData.append('username', auth?.username)
        !parentCommentId && formData.append('userId', auth?.id)
        formData.append('articleId', articleId)
        parentCommentId && formData.append('commentId', parentCommentId)
        !parentCommentId && formData.append('articleId', articleId)
        parentCommentId && await postResponseToComment(formData)
        !parentCommentId && await postComment(formData)
        const data = await getComments(articleId)

        setCommentLength(data.length)
        setComments(data)
        setContent('')
        setContentResponse('')
        setParentCommentId(null)
    }


    const handleAddLike = async (cmtId) => {
        await addLike(auth?.id, cmtId)
        const data = await getComments(articleId)
        setCommentLength(data.length)
        setComments(data)
    }

    
    const handleAddLikeToRespose = async (responseId) => {
        await addLikeToResponseComment(auth?.id, responseId)
        const data = await getComments(articleId)
        setCommentLength(data.length)
        setComments(data)
    }

    const handleShowResponseToComment = (commentId) =>{
        if(!showResposesId.includes(commentId)){
         return setShowResposesId(v => [...v, commentId])
        }
        const showResposesIdCopy = [...showResposesId]
        const index = showResposesIdCopy.findIndex(item => item === commentId)
        showResposesIdCopy.splice(index, 1)
        setShowResposesId(showResposesIdCopy)
        
    }

    useEffect(() => {
        const fetcheData = async () => {
            const data = await getComments(articleId)
            setCommentLength(data.length)
            setComments(data)
        }
        fetcheData()
    }, [articleId])

    return (
        <div className='mt-40 py-10 border-t'>
            <h1 className={`${inter.className} text-2xl font-bold text-black/75 `}>{commentLength} Commentaire{commentLength > 1 && 's'}  </h1>
            {
                comments?.map(comment => (
                    <div className='mt-20'>
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
                                    onClick={() => setParentCommentId(comment?.id)}
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
                            </div>

                        </footer>

                        { showResposesId.includes(comment.id) &&
                            comment?.responseToComments.map(response => (
                                <ResponseToComment comment={response} handleAddLikeToRespose={handleAddLikeToRespose} />
                            ))
                        }

                        {
                            parentCommentId === comment.id &&

                            <div className='mt-10'>
                                <form onSubmit={handleSubmit} action="">
                                    <div className='flex flex-col'>
                                        <label htmlFor="comment">Répondre:</label>
                                        <textarea
                                            onChange={(e) => setContentResponse(e.target.value)}
                                            value={contentResponse} id='comment' className='h-[200px] p-3 text-sm mt-4 outline-none border-2 resize-none' >
                                        </textarea>
                                    </div>
                                    <button className='h-[30px] w-[100px] text-sm opacity-90 hover:opacity-100 bg-black text-white rounded-md mt-4' type='submit'>Répondre</button>
                                </form>
                            </div>

                        }
                    </div>
                ))
            }

            {/* texterea */}
            {!parentCommentId &&
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
            }
            {
                parentCommentId &&
                <button
                    onClick={() => setParentCommentId(null)}
                    className='h-[50px] w-1/2 opacity-90 hover:opacity-100 bg-black text-white rounded-md mt-4'>Ajouter un commentaire
                </button>

            }
        </div>
    )
}
