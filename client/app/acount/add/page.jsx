"use client"
import { posteArticle } from '../../../lib/articles'
import { upload } from '../../../lib/upload'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import TextEditor from '../../lexical-textEditor/textEditor'
import { useRouter } from 'next/navigation'
import { getCategories, getCategory } from '../../../lib/category'
import { useSelector } from 'react-redux'


export default function page() {
    const auth = useSelector(state => state.auth)
    const [categories, setCategoies] = useState([])
    const [file, setFile] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [title, setTitle] = useState('')
    const [imageSrc, setImageSrc] = useState('')
    const rooter = useRouter()


    const handeFileChange = (e) => {
        if (!e.target.files[0]) return
        setFile(e.target.files[0])
        let src = URL.createObjectURL(e.target.files[0])
        setImageSrc(src)
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCategories()
            setCategoies(data)
        }
        fetchData()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const content = document.querySelector('.editor-input')
        const body = content.innerHTML

        if (!file) return
        if (body.trim() === '' || title.trim() === '') return

        const formData = new FormData()
        const formDataImage = new FormData()

        formData.append("categoryId", categoryId)
        formData.append("title", title)
        formData.append("body", body)
        formData.append("userId", auth?.id)
        formData.append("url", file.name)
        formDataImage.append('image', file)

        setTitle('')
        setCategoryId('')

        await posteArticle(formData)
        await upload(formDataImage)
        rooter.push('/')
    }


    return (
        <div className='globalWidth'>
            <div className='w-full my-10'>
                <h1 className='text-2xl mb-4 '>Ajouter une article</h1>
                {imageSrc &&
                    <Image className='my-10 w-[200px] h-[250px] object-cover' alt="image de l\'article" src={imageSrc} width={500} height={400} />
                }
                <div className='flex flex-col gap-4 w-full' >
                    <input type="file" onChange={handeFileChange} />
                    <div className='w-full'>
                        <label htmlFor='' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Catégories</label>
                        <select
                            onChange={(e) => setCategoryId(e.target.value)}
                            value={categoryId}
                            id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                            {
                                categories.map(item => (
                                    <option key={item.id} value={item.id}>{item.title} </option>
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
                    <button onClick={handleSubmit} className='w-full h-[50px] border-none rounded-md bg-black text-white cursor-pointer'>
                        Publier
                    </button>
                </div>
            </div>
        </div>
    )
}
