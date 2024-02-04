"use client"
import { editArticle, getArticle, posteArticle } from '@/lib/articles'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'


export default function page() {
    const {id}  = useParams()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')


    useEffect(()=>{
        const fetchData = async () =>{
            const article = await getArticle(id)
            setTitle(article?.title)
            setBody(article?.body)
        } 
        fetchData()
    },[id])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(body.trim() === '' || !title.trim() === '') return   
      
          editArticle(id,{title, body}).then(_ => {
            setTitle('')
            setBody('')
        })
    }

    return (
        <div className='globalWidth'>
            <div className='w-full mt-20'>
            <h1 className='text-2xl mb-4 '>Modiifier l'article </h1>

                <form className='flex flex-col gap-4 w-1/2' action="" onSubmit={handleSubmit}>
                    <div className='w-full'>
                        <label htmlFor="title">Titre</label>
                        <input
                            className='w-full h-[50px] rounded-md border border-[#ddd] pl-3 text-xl outline-none'
                            type="text" id='title' 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                    </div>
                    <div>
                        <label htmlFor="body">Contenu</label>
                        <textarea
                            className='w-full h-[150px] rounded-md border border-[#ddd] p-3 outline-none text-xl resize-none'
                            name="body" id="body" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                    </div>
                    <input className='w-full h-[50px] border-none rounded-md bg-black text-white' type="submit" value='Modifier' />
                </form>
            </div>
        </div>
    )
}
