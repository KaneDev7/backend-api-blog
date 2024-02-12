"use client"
import { useEffect, useState } from "react";
import { deleteArticle, getArticles } from "../../../lib/articles";
import Link from "next/link";

import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useRouter } from "next/navigation";

export default function page() {
    const [articles, setArtcicles] = useState()
    const auth = useSelector(state => state.auth)
    const rooter = useRouter()

    const troncText = (text, length) => {
        if (text.length < length) return text
        return text.slice(0, length) + '...'
    }

    const handleDeleteArticle = async (id) => {
        const confirmDelete = window.confirm('Voulez-vous vraiment supprimer l\'article')
        if (!confirmDelete) return
        const data = await deleteArticle(id)
        console.log('data', data)
        setArtcicles(data?.articles)
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getArticles()
            setArtcicles(data)
        }
        fetchData()
    }, [])

    return (
        <div className='mt-10'>
            <div className='flex justify-between gap-10'>
                <div className=''>
                    <div>
                        <FaCircleUser fontSize={200} color='#aaa' />
                        <p className='text-center text-red-400 mt-4 text-2xl font-medium'> {auth.username} </p>
                        <p className='text-center text-sm'> {articles?.length} articles</p>
                    </div>
                </div>
                <div className='flex-1 border min-h-[500px] p-4'>
                    <h1 className='text-2xl font-bold'>Mes articles </h1>
                    <ul className="mt-4">
                        {articles?.length <= 0 && <p>accuun article trouvé</p> }
                        {
                            articles?.map(item => (
                                <li className=" text-xl mt-5 flex justify-between items-center">
                                    <div>
                                        <Link className="hover:underline" href={`/articles/${item.id}`}> {troncText(item.title, 50)} </Link>
                                        <p className="text-sm "> {new Date(item.createdAt).toLocaleDateString()} </p>
                                    </div>
                                    <div className="flex items-center gap-3 text-white">
                                        {/* <button
                                            className="bg-blue-500 text-sm py-2 px-4 rounded-md">
                                            <Link href={`/acount/profile/edit/${item?.id}`}> Modifier </Link>
                                        </button> */}
                                        <button
                                            onClick={() => handleDeleteArticle(item.id)}
                                            className="bg-red-500 text-sm py-2 px-4 rounded-md"> Supprimer </button>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>

                </div>
            </div>
        </div>
    )
}
