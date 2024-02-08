"use client"
import { getArticle, posteArticle } from '../../../../../lib/articles'
import { upload } from '../../../../../lib/articles'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import TextEditor from '../../../../lexical-textEditor/textEditor'
import { categories } from '../../../../articles/constant/articleCategoies'
import { useRouter, useParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { da } from 'date-fns/locale'


export default function page() {
    const [file, setFile] = useState('')
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [imageSrc, setImageSrc] = useState('')
    const rooter = useRouter()
    const { id } = useParams()
    const dispatch = useDispatch()


    const handeFileChange = (e) => {
        if (!e.target.files[0]) return
        setFile(e.target.files[0])
        let src = URL.createObjectURL(e.target.files[0])
        setImageSrc(src)
    }

    console.log('category', category)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const content = document.querySelector('.editor-input')
        const body = content.innerHTML
        if (!file) return
        if (body.trim() === '' || title.trim() === '' || category.trim() === '') return
        const formData = new FormData()
        const formDataImage = new FormData()

        formData.append("category", category)
        formData.append("title", title)
        formData.append("body", body)

        formData.append("url", file.name)
        formDataImage.append('image', file)
        setTitle('')
        setCategory('')

        console.log(formData)
        await posteArticle(formData)
        await upload(formDataImage)
        rooter.push('/')
    }


    useEffect(() => {
        const fetchData = async () => {
            const data = await getArticle(id)
            const content = document.querySelector('.editor-inner')
            content.firstChild.remove()
            // console.log(content)
            
            const editorInput = document.createElement('div')
            editorInput.className = 'editor-input'
            editorInput.contentEditable = true
            editorInput.role = 'textbox'
            editorInput.spellcheck = true
            editorInput.setAttribute('data-lexical-editor', "true")
            editorInput.setAttribute('style',"user-select: text; white-space: pre-wrap; word-break: break-word;")
            editorInput.innerHTML = data?.body
            console.log('editorInput', editorInput)
            content.append(editorInput)
            // content.lastChild.remove()


            
            // content.innerHTML = '<P>hqlllq</p>' + data?.body
            setTitle(data?.title)
            setCategory(data?.category)
            setImageSrc(`/images/${data?.url}`)
            
        }
        fetchData()
    },[id])

    return (
        <div className='globalWidth'>
            <div className='w-full my-10'>
                <h1 className='text-2xl mb-4 '>Modifier l'article</h1>
                {imageSrc &&
                    <Image className='my-10 w-[200px] h-[250px] object-cover' alt="image de l\'article" src={imageSrc} width={500} height={400} />
                }
                <form className='flex flex-col gap-4 w-full' action="" onSubmit={handleSubmit}>
                    <input type="file" onChange={handeFileChange} />
                    <div className='w-full'>
                        <label htmlFor='' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Catégories</label>
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                            id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                            {
                                categories.map(item => (
                                    <option key={item} value={item}>{item} </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="title" className='mb-2 block'>Titre</label>
                        <input
                            className='w-full h-[40px] rounded-md border pl-3 text-xl outline-none'
                            type="text" id='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="" className='mb-2 block'>Contenu</label>
                        <TextEditor />
                    </div>
                    <input className='w-full h-[50px] border-none rounded-md bg-black text-white' type="submit" value='Publier' />
                </form>
            </div>
        </div>
    )
}
