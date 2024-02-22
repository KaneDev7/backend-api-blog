import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { editComment, editResponseToComment, getComments, postResponseToComment, getComment } from '../../../../lib/comments'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { FaCircleUser, FaUser } from 'react-icons/fa6'
import { troncText } from '../../../../utils'


export default function CommentModal({
    setShowEditModal,
    modalContent,
    setModalContent,
    editContentId,
    setComments,
    isEditResponseToComment,
    parentCommentId,
    setParentCommentId
}) {

    const auth = useSelector(state => state.auth)
    const [commentToResponse, setCommmentToResponse] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { id: articleId } = useParams()

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (modalContent.trim() === '') return
        const formData = new FormData()
        formData.append('content', modalContent)

        if (parentCommentId) {
            formData.append('username', auth?.username)
            formData.append('commentId', parentCommentId)
            await postResponseToComment(formData)
        } else {
            !isEditResponseToComment && await editComment(editContentId, formData)
            isEditResponseToComment && await editResponseToComment(editContentId, formData)
        }

        const data = await getComments(articleId)
        setComments(data)
        setShowEditModal(false)
        setModalContent('')
    }

    const handleClick = () => {
        setShowEditModal(false)
        setParentCommentId(null)
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            if (!parentCommentId) return
            const data = await getComment(parentCommentId)
            setCommmentToResponse(data)
            setIsLoading(false)
        }
        fetchData()
    }, [parentCommentId])

    return createPortal(
        <div className='w-full h-full flex justify-center items-center fixed inset-0 '>
            <div onClick={handleClick} className='w-full h-full absolute inset-0 z-[-1] bg-black/50'></div>
            <div className='bg-white p-5 rounded-md'>
                {
                !isLoading && parentCommentId &&
                    <div className='w-[500px]'>
                        <div className='flex items-center gap-3'>
                            <FaCircleUser size={35} color='#9d9d9df1' />
                            <p className='font-bold'> {commentToResponse?.user?.username}  </p>
                        </div>
                        <p className='p-3 my-3 bg-black/5 text-sm'>
                            {troncText(commentToResponse?.content, 150)}
                        </p>
                    </div>
                }
                <div className='w-[500px] '>
                    <form onSubmit={handleSubmit} action="">
                        <div className='flex flex-col'>
                            <label className='text-red-600 ' htmlFor="comment"> </label>
                            <textarea
                                placeholder={parentCommentId ? 'Répondre' : 'Commentaire'}
                                onChange={(e) => setModalContent(e.target.value)}
                                value={modalContent} id='comment' className='h-[200px] p-3 text-sm mt-4 outline-none border-2 resize-none' >
                            </textarea>
                        </div>
                        <button className='h-[50px] w-1/3 opacity-90 hover:opacity-100 bg-black text-white rounded-md mt-4' type='submit'> {parentCommentId ? 'Répondre' : 'Modifier'} </button>
                    </form>
                </div>
            </div>
        </div>

        , document.body
    )



}
