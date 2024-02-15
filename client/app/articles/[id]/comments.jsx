"use client"
import React, { useEffect, useState } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { Oswald } from "next/font/google";
import { AiOutlineLike } from "react-icons/ai";
import { PiBellSimpleRinging } from "react-icons/pi";
import { postComment, getComments } from '../../../lib/comments'
import { useSelector } from 'react-redux';
import { convertISOToDuration } from '../../../utils';

const inter = Oswald({ subsets: ["latin"] });



export default function Comments({ articleId }) {
    const auth = useSelector(state => state.auth)
    const [comments, setComments] = useState([])
    const [content, setContent] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (content.trim() === '') return
        if(!auth) return alert('Veuillez vous connecter pour pouvoir poster un commentaire')
        const formData = new FormData()
        formData.append('content', content)
        formData.append('parent_comment_id', null)
        formData.append('userId', auth?.id)
        formData.append('articleId', articleId)
        await postComment(formData)
        setContent('')
        const data = await getComments(articleId)
        setComments(data)
    }

    useEffect(() => {
        const fetcheData = async () => {
            const data = await getComments(articleId)
            console.log('comments', data)

            setComments(data)
        }
        fetcheData()
    }, [articleId])

    return (
        <div className='mt-40 py-10 border-t'>
            <h1 className={`${inter.className} text-2xl font-bold text-black/75 `} >{comments.length} Commentaire{comments.length > 1 && 's'}  </h1>

            {
                comments?.map(comment => (
                    <div className='mt-10'>
                        <header className={`flex gap-5 items-center py-3 border-b`} >
                            <FaCircleUser size={50} color='#9d9d9df1' />
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
                                <span className={`${inter.className} rounded-full px-2 py-[2px] font-bold  bg-black/60 text-[10px] text-white`} > REPONDRE </span>
                                <p className='flex items-center gap-1'>
                                    <AiOutlineLike size={20} color='#7c7c7c' />
                                    <span className='text-[13px] text-[#7c7c7c] '> +2</span>
                                </p>
                            </div>
                            <div className={`${inter.className} flex items-center gap-2 cursor-pointer text-sm text-red-600 `} >
                                <PiBellSimpleRinging size={17} />
                                <p>Signaler</p>
                            </div>
                        </footer>

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
